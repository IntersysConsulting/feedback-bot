const MongoClient = require('mongodb').MongoClient;
    assert = require('assert'),
    fs  = require('fs'),
    json = JSON.parse(fs.readFileSync('config.json', 'utf8')),
    url = `mongodb://${json.mongoUser}:${json.mongoPass}@${json.mongoUrl}`,
    dbName = json.mongoDb;


exports.insert = obj => { MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection(json.mongoCollection).insertOne(obj, function(err, r) {
        assert.equal(null, err);
        assert.equal(1, r.insertedCount);
    });
    client.close();
})};
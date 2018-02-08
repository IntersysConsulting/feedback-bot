const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const fs  = require('fs');
const json = JSON.parse(fs.readFileSync('config.json', 'utf8'));

const url = `mongodb://${json.mongoUser}:${json.mongoPass}@${json.mongoUrl}`;
const dbName = json.mongoDb;


exports.insert = object => { MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    db.collection(json.mongoCollection).insertOne(object, function(err, r) {
        assert.equal(null, err);
        assert.equal(1, r.insertedCount);
    });
    client.close();
})};
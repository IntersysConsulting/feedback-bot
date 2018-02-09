const fs  = require('fs');
const json = JSON.parse(fs.readFileSync('config.json', 'utf8'));

module.exports = function(robot) {
    robot.respond(/(feedback|f|queja) (.*)/i, msg => {
        const feedback = msg.match[2];
        robot.brain.set(`${msg.message.user.id}-feedback`, feedback);
        msg.reply(`This is your feedback: ${feedback}, are you ok? y/n`);
    });

    robot.respond(/(y|yes)/i, msg => {
        const feedback = robot.brain.get(`${msg.message.user.id}-feedback`);
        if (!feedback) {
            return;
        }
        msg.reply('Ok, i will post your feedback to the leadership team');
        robot.messageRoom(json.roomId,  `@here Hi leadership team i received new feedback: ${feedback}`);
        robot.brain.set(`${msg.message.user.id}-feedback`, null);
    });

    robot.respond(/(n|no)/i, msg => {
        const feedback = robot.brain.get(`${msg.message.user.id}-feedback`);
        if (!feedback) {
            return;
        }
        robot.brain.set(`${msg.message.user.id}-feedback`, null);
        msg.reply("Ok, I'll forget you said that");
    });    
};





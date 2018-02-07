const fs  = require('fs');
const github = require('./utils/github');
const slack = require('./utils/slack');
// const brain = require('./utils/brain');
const json = JSON.parse(fs.readFileSync('config.json', 'utf8'));

module.exports = function(robot) {
    robot.respond(/ (feedback|f|queja) (.*)/i, msg => {
        const feedback = msg.match[2];
        robot.brain.set(msg.message.user.id, feedback);
        msg.reply(`This is your feedback: ${feedback}, are you ok? y/n`);
    });

    robot.respond(/(y|Yes|Y|yes)/i, msg => {
        const feedback = robot.brain.get(msg.message.user.id);
        if (!feedback) {
            msg.reply('Emmmmm ok...');
            return;
        }
        msg.reply('Ok, i will post your feedback to the leadership team');
        robot.messageRoom(json.roomId,  `@here Hi leadership team i received new feedback: ${feedback}`);
        robot.brain.set(msg.message.user.id, null);
    });

    robot.respond(/(n|No|N|no)/i, msg => {
        const feedback = robot.brain.get(msg.message.user.id);
        if (!feedback) {
            msg.reply('Emmmmm ok...');
            return;
        }
        robot.brain.set(msg.message.user.id, null);
        msg.reply("Ok, I'll forget you said that");
    });    
};





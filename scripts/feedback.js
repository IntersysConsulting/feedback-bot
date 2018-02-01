const fs  = require('fs');
const json = JSON.parse(fs.readFileSync('config.json', 'utf8'));

module.exports = function(robot) {
    robot.respond(/feedback (.*)/i, function(msg){
        var today = new Date();
        feedback = msg.match[1];
        robot.messageRoom(json.roomId,  `@here Hi leadership team i received new feedback: ${feedback}`);
    });
}
module.exports = function(robot) {
    robot.respond(/feedback (.*)/i, function(msg){
        var today = new Date();
        feedback = msg.match[1];
        robot.messageRoom('G91QEK883',  `@here Hi leadership team i received new feedback: ${feedback}`);
    });

    robot.hear(/(mexico || México || Mexico)/i,function(msg){
        msg.send('mexico rocks');
    });
}
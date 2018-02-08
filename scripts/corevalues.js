
const mongo = require('../utils/mongo');

module.exports = function(robot) {
    robot.respond(/(core values)/i, msg => {
        robot.brain.set(`${msg.message.user.id}-state`, 'nominate');
        msg.reply('Who you want to nominate? (Full Name please)');
    });

    robot.respond(/(.*)/i, msg => {
        const answer = msg.match[1].toLowerCase();
        let msgArray;
        if (answer === 'core values')
            return;
        const state = robot.brain.get(`${msg.message.user.id}-state`);
        switch (state) {
            case 'nominate':
                robot.brain.set(`${msg.message.user.id}-name`, answer);
                robot.brain.set(`${msg.message.user.id}-state`, 'value');
                msgArray = ['Nice,  what value?', 'Be in Service to Others', 'Be Authentic', 'Bring Excellence', 'Be Accountable'];
                msg.reply(msgArray.join(' \n '));
                break;
            case 'manager':
                robot.brain.set(`${msg.message.user.id}-manager`, answer);
                robot.brain.set(`${msg.message.user.id}-state`, 'location');
                msg.reply('Please provide the market city of the nominated');
                break;
            case 'location': 
                robot.brain.set(`${msg.message.user.id}-location`, answer);
                robot.brain.set(`${msg.message.user.id}-state`, 'your_manager');
                msg.reply('Who is your manager?');
                break;   
            case 'your_manager': 
                robot.brain.set(`${msg.message.user.id}-ymanager`, answer);
                robot.brain.set(`${msg.message.user.id}-state`, 'your_location');
                msgArray = ['What is your market city?', 'Austin', 'Phoenix', 'New York', 'Guadalajara'];
                msg.reply(msgArray.join(' \n '));
                break;                  
            case 'your_location': 
                const city = answer.toLowerCase();
                robot.brain.set(`${msg.message.user.id}-ylocation`, city);                
                const object = createObject(robot,msg); 
                robot.brain.set(`${msg.message.user.id}-state`, 'check');
                msgArray = [
                    'Ok we are almost done', 
                    'this is your nomination', 
                    `*Nominee*:${object.nominated}`,
                    `*Value*:${object.value}`,
                    `*Reason*:${object.reason}`,
                    `*Manager*:${object.manager}`,
                    `*Market City*:${object.location}`,
                    '*Your Information*',
                    `*User*:${object.userName}`,
                    `*Manager*:${object.userManager}`,
                    `*Market City*:${object.userLocation}`,
                    `:${object.value}:`,
                    'Are you ok with this? yes/no']
                msg.reply(msgArray.join(' \n '));
                break;     
            case 'reason':
                robot.brain.set(`${msg.message.user.id}-reason`, answer); 
                robot.brain.set(`${msg.message.user.id}-state`, 'manager');
                msg.reply('Who is his/her manager?');
                break;                                                                        
            default:
                break;
        }
    });    

    robot.respond(/(y|yes)/i, msg => {
        const state = robot.brain.get(`${msg.message.user.id}-state`);
        if (state !== 'check') {
            return;
        }
        const object = createObject(robot,msg);
        mongo.insert(object);
        robot.brain.set(`${msg.message.user.id}-state`, null);
        msg.reply('Posted thanks for your nomination');
    });

    robot.respond(/(n|no)/i, msg => {
        const state = robot.brain.get(`${msg.message.user.id}-state`);
        if (state !== 'check') {
            return;
        }
        robot.brain.set(`${msg.message.user.id}-state`, null);
        msg.reply("Ok :(");
    });   

    //To do create a single function for this step
    robot.respond(/(be in Service to others|service|be service)/i, msg => {
        const state = robot.brain.get(`${msg.message.user.id}-state`);
        if (state !== 'value') {
            msg.reply(':be_in_service:');
        }
        robot.brain.set(`${msg.message.user.id}-value`, 'be_in_service');
        robot.brain.set(`${msg.message.user.id}-state`, 'reason');
        msg.reply('Provide a reason for nomitation');
    });

    robot.respond(/(be authentic|authentic)/i, msg => {
        const state = robot.brain.get(`${msg.message.user.id}-state`);
        if (state !== 'value') {
            msg.reply(':be_authentic:');
        }       
        robot.brain.set(`${msg.message.user.id}-value`, 'be_authentic'); 
        robot.brain.set(`${msg.message.user.id}-state`, 'reason');
        msg.reply('Provide a reason for nomitation');
    }); 

    robot.respond(/(bring excellence|excellence)/i, msg => {
        const state = robot.brain.get(`${msg.message.user.id}-state`);
        if (state !== 'value') {
            msg.reply(':bring_excellence:');
        }        
        robot.brain.set(`${msg.message.user.id}-value`, 'bring_excellence');
        robot.brain.set(`${msg.message.user.id}-state`, 'reason');
        msg.reply('Provide a reason for nomitation');
    });     

    robot.respond(/(be accountable|accountable)/i, msg => {
        const state = robot.brain.get(`${msg.message.user.id}-state`);
        if (state !== 'value') {
            msg.reply(':be_accountable:');
        }    
        robot.brain.set(`${msg.message.user.id}-value`, 'be_accountable');   
        robot.brain.set(`${msg.message.user.id}-state`, 'reason'); 
        msg.reply('Provide a reason for nomitation');
    });      
};

const createObject = (robot,msg) => {
    const nominated = robot.brain.get(`${msg.message.user.id}-name`),
        value = robot.brain.get(`${msg.message.user.id}-value`),
        reason = robot.brain.get(`${msg.message.user.id}-reason`),
        manager = robot.brain.get(`${msg.message.user.id}-manager`),
        location = robot.brain.get(`${msg.message.user.id}-location`),
        userName = msg.message.user.name,
        userManager = robot.brain.get(`${msg.message.user.id}-ymanager`),
        userLocation = robot.brain.get(`${msg.message.user.id}-ylocation`);
    return object = { nominated, value, reason, manager, location, userName, userManager, userLocation }
}
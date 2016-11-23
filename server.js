var token = '296649568:AAFTfr1wsPZCm0Z-N2eQSEFR-Wj9r3bJtJA';
var token2='275910306:AAEDOsceNmtMxI-ZT0TrCBuNXjrwHaNGVHE';
var Telegram = require('node-telegram-bot-api');
var fs = require('fs');

bot = new Telegram(token, {
    polling: true
});


console.log("Bot working on destruction");

bot.getMe().then(function (me) {
    console.log(me.username);
    console.log(me.id);     
    console.log(me.first_name);
    console.log(me.last_name);

});
bot.onText(/\/start/i, function (msg, match) {
    console.log('A new User Contacted');
    bot.sendMessage(msg.chat.id, " Hi! " + msg.from.first_name + ", let's start with the fun stuff?");
    console.log(msg.chat.id);
    console.log(msg.chat.group_name);
    console.log("************* User info **************");
    console.log(msg.from.username);
    console.log(msg.from.id);
    console.log(msg.from.first_name);
    console.log(msg.from.last_name);
    console.log("***************************************");
});


bot.onText(/print(.+)/i, function (msg, match) {
    var resp = match[1];
    console.log(msg.chat.id);
    console.log(msg.from.first_name);
    bot.sendMessage(msg.chat.id, resp);
});

bot.onText(/(hey|hi|what's up|how are you|hello|hey there)/i, function (msg) {
    bot.sendMessage(msg.chat.id, "Hey there " + msg.from.first_name + ", How  are you?")
        .then(() => {
            var chatId = msg.chat.id;
            var messageId = msg.message_id;
            bot.onReplyToMessage(chatId, messageId, function (message) {
                bot.sendMessage(chatId, "Good to hear that.");
            })
        })

});

bot.onText(/\/help/i, function (msg) {
    bot.sendMessage(msg.chat.id, 'you will get help content here \n.\n.\n.\n.\n.\n Shittt !!. it was supposed to be here');
});






bot.onText(/so/i, function (msg) {
    var chatId = msg.chat.id;
    var options = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            resize_keyboard: true,
            one_time_keyboard: true,
            request_contact: true,
            keyboard: [
                [{
                    text: 'Telegram',
                    callback_data: '1'
                }],
                [{
                    text: 'Whatsapp',
                    callback_data: '2'
                }],
                [{
                    text: 'Hike',
                    callback_data: '3'
                }],

            ]
        })
    };

    bot.sendMessage(chatId, "What's the best messenger ? ", options)
        .then(() => {
            bot.on("callback_query", answer => {
                var choice = Number(answer.data);
                console.log(choice);
                if (choice == 1) {
                    bot.sendMessage(chatId, "Telegram is good, with the devops support");
                } else if (choice == 2) {
                    bot.sendMessage(chatId, "Whatsapp is simple and widely used !!");
                } else {
                    bot.sendMessage(chatId, "Hike has lot of feature which the dev even don't know :p ");
                }
            })
        })

});


bot.onText(/let's play/i, function (msg, match) {
    var chatId = msg.chat.id;
    var options = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                    text: "Facebook",
                    callback_data: '1'
                }],
                [{
                    text: "Twitter",
                    callback_data: '2'
                }],
                [{
                    text: "Youtube",
                    callback_data: '3'
                }]
            ]
        })
    };
    bot.sendMessage(msg.from.id, "What's your Favourite site", options)
        .then(() => {
            bot.on("callback_query", answer => {
                var fav = Number(answer.data);
                if (fav == 1) {
                    bot.sendMessage(chatId, "can't find much worst place then this");
                } else if (fav == 2) {
                    bot.sendMessage(chatId, "Fan of birds? interesting");
                } else {
                    bot.sendMessage(chatId, "too much of a Youtube addict, I see");
                }
            })
        })
})


bot.onText(/exit/i, function (msg) {
    var photo = 'cat.jpg';
    bot.sendPhoto(msg.chat.id, photo, {
        caption: 'you Better Get movin'
    });
})

bot.onText(/websites/i, function (msg) {
    var chatId = msg.chat.id;
    var options = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                    text: "Wordsmaya",
                    url: 'www.Wordsmaya.com'
                }],
                [{
                    text: "Quora",
                    url: 'www.quora.com'
                }],
                [{
                    text: "Pixlov",
                    url: 'www.pixlov.com'
                }]
            ]
        })
    };
    bot.sendMessage(chatId, "Which website to open", options);
})


bot.onText(/[^(exit|hey|let's play|so|help|hey|hi|telegram|whatsapp|hike|what's up|websites|how are you|hello|hey there|i am fine|\/start)]/i, function (msg) {
    console.log("something went strange :( ");
    bot.sendMessage(msg.chat.id, "wait what?!! we no speak same language :( \n  /help try");


})


bot.onText(/\/forward (.+)/i,function(msg,match){
    forward=match[1];
    bot.sendMessage(252636937,"The Forwaded Message is as follow :\n"+forward);
    bot.sendMessage(-153199017,"The Forwaded Message is as follow :\n"+forward);
    
})



bot.on('message',function(msg){
    console.log(msg.chat.id);
    if(msg.hasOwnProperty('voice')){
        console.log("inside");
    bot.sendVoice(-1001077627138,msg.voice.file_id);
    }
if(msg.chat.id<0)
{
    console.log("group contacted");
}else{
    console.log("Person has contacted");
}
})

/*
bot.on('message',function(msg){
var date = new Date();
var content=msg.text+" - by -"+msg.from.username+" at "+date;
fs.appendFile("log.txt","\r\n"+content, function(err) {
    if(err) {
        return console.log(err);
    }
}); 
})*/
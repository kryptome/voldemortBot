var Story = require('inkjs').Story;
var fs = require('fs');
var readline = require('readline');
var telegramBot = require('node-telegram-bot-api');

//load the ink file
var inkFile = fs.readFileSync('./intercept.json', 'UTF-8').replace(/^\uFEFF/, '');

//create a new story
var myStory = new Story(inkFile);
var bot = new telegramBot("XXXTOKENXXXX", {
	polling: true
});

//start reading and writting to the console
/*
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
*/
//continueToNextChoice();

bot.on('message', function (msg) {
	bot.sendChatAction(msg.chat.id,"typing");
	if (msg.text === '/start') {
		bot.sendMessage(msg.chat.id, "Welcome");
	} else if(msg.text==='/stop'){
	}else{
		continueToNextChoice(bot, msg);
	}
})

bot.on('callback_query',function(msg){
	bot.sendChatAction(msg.chat.id,'typing');
	myStory.ChooseChoiceIndex(parseInt(msg.data));
			continueToNextChoice(bot,msg);
})


function continueToNextChoice(bot, msg) {
	//check we haven't reached the end of the story
	if (!myStory.canContinue && myStory.currentChoices.length === 0) end();
	if(msg.hasOwnProperty('text')){
		var chatId=msg.chat.id;
	}else{
		var chatId=msg.from.id;
	}
	//write the story to the console until we find a choice
	while (myStory.canContinue) {
		bot.sendMessage(chatId, myStory.Continue());
		//console.log(myStory.Continue());
	}

	var options = {};
	var array = [];
	    var superArray = [];

	//check if there are choices
	if (myStory.currentChoices.length > 0) {
		for (var i = 0; i < myStory.currentChoices.length; ++i) {
			var choice = myStory.currentChoices[i];
			options.text = choice.text;
			options.callback_data = i.toString();
			array.push(options);
			options = {};
			//console.log((i + 1) + ". " + choice.text);
		}
	    superArray.push(array);		
		var inlineOptions = {
			reply_markup: JSON.stringify({
				inline_keyboard: superArray,
			})
		};
		//prompt the user for a choice
		bot.sendMessage(chatId, "Choose", inlineOptions);
		/*
		rl.question('> ', (answer) => {
			//continue with that choice
			myStory.ChooseChoiceIndex(parseInt(answer) - 1);
			continueToNextChoice();
		});
		*/
	} else {
		//if there are no choices, we reached the end of the story
		end(bot,chatId);
	}
}


function end(bot,chatId) {
	bot.sendMessage(chatId,"You reached the end of the story, type /start to read it again :)");
}

var request = require('request');
var bodyParser = require('body-parser');
var express = require('express');
var TeleBot = require('telebot');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const bot = new TeleBot(process.env.TELEGRAM_BOT_API)

//your routes here
app.get('/', function (req, res) {
	res.send("Hello World, I am a Telegram bot.")
});

// On Start command
bot.on(['/start'], msg => {
	let replyMarkup = bot.keyboard([
		['/matches']
	], { resize: true });
	return bot.sendMessage(msg.from.id, 'Select matches to get a list of matches', { replyMarkup });
});

// Send match list
bot.on(['/matches'], msg => {
	request.post({ 
		url: 'http://cricapi.com/api/matches', 
		form: { 
			apikey: process.env.CRICAPI 
		} 
	}, 
	function (err, httpResponse, body) {
		body = JSON.parse(body)
		var i = 0;
		var matchList = "Select a match : \n"
		while (body.matches[i].matchStarted && i < 10){
			matchList = matchList.concat('\n' + body.matches[i]['team-1'] + ' vs ' + body.matches[i]['team-2'] + '\n' + "/score_" + body.matches[i].unique_id + "\n")
			i++
		}
		return bot.sendMessage(msg.from.id, matchList);
	})
});

// Send score
bot.on(/^\/score_(.+)$/, (msg, props) => {
	const match_id = props.match[1];
	request.post({
		url: 'http://cricapi.com/api/cricketScore',
		form: {
			apikey: 'BrYZnEiZScQmF5xIwrnQRVUdBgy2',
			unique_id: match_id
		}
	},
		function (err, httpResponse, body) {
			body = JSON.parse(body)
			score = body.score
			score = score.replace('&amp;', ',')
			score = score.split('v')
			score = score[0].trim() + '\n' + score[1].trim()
			return bot.sendMessage(msg.from.id, score)
		})
});

bot.connect();

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

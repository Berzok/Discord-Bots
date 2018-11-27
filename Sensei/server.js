// server.js
// where your node app starts


//Fonctions

function decryptMessage(msg){
	if (!verifPrefix(msg) || msg.author.bot)
		return;
	var args = msg.content.slice(prefix.length).trim().split(/ +/g);
	var commande = args.shift().toLowerCase();
  if (commande === 'ping')
    pong(msg);
	if (commande === 'wait')
		attendre(msg, args);
}


function verifPrefix(msg){
  if(msg.content.startsWith(prefix))
	return true;
  return false;
}


function attendre(msg, x){
	msg.reply('Je suis fatigué, je vais aller dormir quelques minutes...');
	sleep(x*1000+1000).then(() => {
    msg.reply("Ah j'ai bien dormi, je suis frais comme un gardon maintenant!");
  });
}

function pong(msg){
  msg.reply('pong');
}


// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// init project
const express = require('express');
const app = express();

const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = "&";


client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {
  decryptMessage(msg);
 });



const token = process.env.TOKEN;
client.login(token);

const http = require('http');
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 60000);

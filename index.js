const Discord = require('discord.js');
const client = new Discord.Client();

require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');

// The minimum prediction confidence.
const threshold = 0.9;
let model;

client.on('ready', async () => {
    model = await toxicity.load(threshold);
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if (msg.author.bot)
        return;

    let text = msg.content;
    let predictions = await model.classify(text);
    predictions.forEach(prediction => {
        if(prediction.results[0].match) {
            msg.reply(`Warning! ${prediction.label} found in your earlier message. Please Delete.`);
        }
    });
});

client.login('ODI5MjQ3NTk5NzEzMzIwOTcw.YG1XAg.75nWSZzcC34Tv9EsemF2N_6sE50');
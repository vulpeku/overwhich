// This is the newer (ES6) way to import things, it's more flexible allowing for 
import * as Discord from 'discord.js';
import * as dotenv from 'dotenv';
import  { deployCommands } from './deploy-commands.js'

import { generateCommands } from './generate-commands.js';




// Adds the variables from the .env to the environment variables
// accessible with: process.env.VARIABLE_NAME
dotenv.config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN

const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds]});

client.commands = await generateCommands()
await deployCommands.deploy()
client.on(Discord.Events.InteractionCreate, async interaction => {
  if(!interaction.isChatInputCommand()) return;
  client.commands.get(interaction.commandName).execute(interaction)

})

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.login(process.env.DISCORD_TOKEN);

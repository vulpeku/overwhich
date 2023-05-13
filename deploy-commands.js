import { REST, Routes } from 'discord.js'
import { generateCommands } from './generate-commands.js';
import * as dotenv from 'dotenv';

dotenv.config();

const deploy = async function(){
	const SERVER_ID = process.env.SERVER_ID
	const APP_ID = process.env.APP_ID

	const commands = []
	const getCommands = await generateCommands()
	getCommands.forEach(x => commands.push(x.data.toJSON()))

	// Construct and prepare an instance of the REST module
	const rest = new REST().setToken(process.env.DISCORD_TOKEN);

	// and deploy your commands!
	(async () => {
		try {
			console.log(`Started refreshing ${commands.length} application (/) commands.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationGuildCommands(APP_ID, SERVER_ID),
				{ body: commands },
			);

			console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		} catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();
}

export { deploy }
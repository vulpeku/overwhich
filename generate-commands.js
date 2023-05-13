import { Collection } from 'discord.js' 
import * as fs  from 'fs'
import * as path from 'path'

const generateCommands = async () => {
    let collection = new Collection();

    const commandsPath = path.join(process.cwd(), 'commands')
    const commandsFiles = fs.readdirSync(commandsPath)

    for (let file of commandsFiles){
        const filePath = path.join(commandsPath, file)
        let command = await import(filePath)
        command = command.default
        if(command.data.name && command.execute){
            collection.set(command.data.name, command)
        } else {
            console.log(`[WARN] command file ${filePath} missing the require 'data' or 'execute' property`)
        }
    }
    return collection
}
export {generateCommands}
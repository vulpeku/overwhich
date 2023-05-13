import { roles } from '../data/roles.js'
import axios from 'axios'
import * as Discord from 'discord.js'

const heroSelect = async(role) => {

      const heroes = roles[role];
      const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
      try {
        const response = await axios.get(`https://overfast-api.tekrop.fr/heroes/${randomHero}`);
        return {
          color: Discord.Colors.White,
          name: `Your random hero is: ${response.data.name}`,
          imageUrl: response.data.portrait,
          role
        }
      } catch (error) {
        return  {error}
      }
    };

export {heroSelect}

const buildResponseMessage = (message) => {

  return {
    embeds: [{
      title: message.name,
      decription: message.description,
      image : {
        url: message.imageUrl,
        height: 100,
        width: 100
      },
      color: message.color
    }]
  }
}

export { buildResponseMessage }
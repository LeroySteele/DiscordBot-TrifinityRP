# DiscordBot-TrifinityRP

This is a discord bot for a private FiveM GTA RP server used to automatically manage users, roles and all linked actions.
This bot is registered on Discord Developer Portal, uses mongoDB Atlas Database for online storage and was hosted on Discloud for 24/7 accessibility.
It handles custom slash commands and custom event listeners with an indepth ticket system.

### Commands to run in console during setup
- npm init -y
- npm i discord.js
- npm i -D dotenv
- npm i -D nodemon
- npm i discord-html-transcripts
- npm i @discordjs/rest
- npm i @discordjs/builders
- npm i fs
- npm i google-spreadsheet@2.0.6
  
## Data folder
Contains the discord ID's for the categories, channels and roles.


## Commands folder
Register the slash commands by running 'node deploy-commands.js' in console then they can get used within discord by using a '/' followed by the command name. 


## Events folder
Contains the custom events to preform certain desired actions relating to posting announcement messeges and button event listeners when users open the ticket types they desire.

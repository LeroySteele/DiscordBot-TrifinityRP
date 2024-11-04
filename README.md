# DiscordBot-TrifinityRP

This is a discord bot for a private FiveM GTA police RP server used to automatically manage users, roles and all linked actions.
This bot is registered on Discord Developer Portal and displays certain information using an online excel sheet.
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
All command files starting on 'owner' are used to send the initial messege that contains the button where users can open tickets.


## Events folder
Contains the custom event listeners for: 
- Role updates will display on the excel sheet
- Using button clicks will open specific ticket types
- Logs members joining/leaving
- handles suggestion channel and resends the template 
                                       

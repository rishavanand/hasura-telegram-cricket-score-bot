# Building a Telegram Bot on Hasura

This tutorial is about getting a telegram bot to run on Hasura as quick as possible. This bot is also integrated with API from cricapi.com. Each command will have a description telling you what it does and also be sometimes accompanied by screenshots so that you know you are heading in the right direction.

There will also be links to provide you with more information on a topic. Do remember to follow them.

We will be using telebot package (https://github.com/mullwar/telebot) with NodeJS on our server. When a user sends a message to our bot it will be sent to our server by Telegram. We will then send a response back to the user from our server.

## Pre-requisites

* [NodeJS](https://nodejs.org)

* [hasura CLI](https://docs.hasura.io/0.15/manual/install-hasura-cli.html)

## Let's start :

### 1) Obtain API Key from Cricapi.com

* Navigate to http://www.cricapi.com/fan/signup.aspx and create a new account
* Login and copy your **API KEY** from the cricapi dashboard.

### 2) Create new bot on Telegram app

* Open your Telegram app and search for BotFather
* Select /start
* Select /newbot
* Send a bot name of your choice
* Then send a bot username. Can be anything
* You will then get a confirmation message with the Bot's API. Copy the ***API KEY*** 

## Description

Chatroom microservice for BAIT3173 assignment

## Installation
Open a terminal and go to this repo directory and run:

```bash
$ npm install
```

1. Make a copy of .env.copy and rename it to .env
2. change the value of DATABASE_URL with this format:

If your MySQL user has a password:

**mysql://_{username}_:_{password}_@_{database-host}_:_{database-port}_/_{database-name}_**

If it does not have a password:

**mysql://_{username}_@_{database-host}_:_{database-port}_/_{database-name}_**

## Running the app
Open a terminal and go to this repo directory and run:

```bash
$ npm run start
```
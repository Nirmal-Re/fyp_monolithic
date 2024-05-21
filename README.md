# Introduction

This repository contains code for my monolithic backend, developed for my Final Year Project. It is entirely written in NodeJs with typescript.

# Instructions To Run The Backend In Development:

In order to run the backend, following commands need to be sequentially ran in the CLI (Command Line Interface). Note that NodeJs needs to be installed for these some of these commands to work.

Create a table called `t_login_user_data` in the MySQL database using the dump file in `\sql_dump`. Make sure to provide the necessary credentials in the `.env` file.

1. `cd backend`
2. `npm i`
3. `npm run dev`

# Instruction To Run The Backend In Production:

In order to run the backend, following commands need to be sequentially ran in the CLI (Command Line Interface). Note that NodeJs and pm2 needs to be installed for these some of these commands to work.

1. `cd backend`
2. `npm install --production`
3. `npm run build`
4. `npm run start`

NOTE: A .env file is necessary at the backend directory. It should contain following values
`SQL_DB_NAME=`
`SQL_DB_USER=`
`SQL_DB_PASSWORD=`
`SQL_DB_HOST=localhost`
`SQL_DB_PORT=`

`MONGO_DB_NAME=`
`MONGO_DB_USER=`
`MONGO_DB_PASSWORD=`
`MONGO_DB_HOST=mongodb://localhost:27017`

`JWT_ACCESS_TOKEN_SECRET=e5f3f839b5ccd373f51f28d0c69e5f60726c4d79b7626bc401e6e6209768f83a7c3634e64329966eb6774596c91250dce24af68fe4d5f5912aecc`
`JWT_REFRESH_TOKEN_SECRET=7af4989628b9c23bdeb292ebe298e87dd55e2aaa79cbc6f8e1635924914702276d26ba7833e63f8e72b105e7cf3c7940fd6eeac470`

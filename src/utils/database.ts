import 'reflect-metadata';
import { DataSource } from "typeorm"
import { DATA_SOURCES } from './vars';
import {User } from "../entities/user";
import {Conversation } from "../entities/conversation";

const dataCode = DATA_SOURCES.mySqlDataSource;
/*
export const connectionFactory = new DataSource({
     type: "mysql",
    host: dataCode.DB_HOST,
    port: 3306,
    username: dataCode.DB_USER,
    password: dataCode.DB_PASSWORD,
    database: dataCode.DB_DATABASE,
    entities: ["src/model/*{.js,.ts}"], // typeorm loads entities from this directory
    logging: true,
    synchronize: true,
})*/



export const connectionFactory = new DataSource({
    type: "mysql",
    host: dataCode.DB_HOST,
    port: 3306,
    username: dataCode.DB_USER,
    password: dataCode.DB_PASSWORD,
    database: dataCode.DB_DATABASE,
    entities: [User,Conversation],
    synchronize: false,
    ssl: true,
  extra: {
    ssl: {
      "rejectUnauthorized": false
    }
  }
});
/*
connectionFactory
    .initialize()
    .then(() => {
        console.log(`Data Source has been initialized`);
    })
    .catch((err) => {
        console.error(`Data Source initialization error`, err);
    })

export default connectionFactory;*/

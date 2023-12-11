import {MongoClient, Db, MongoError} from "mongodb";

import { DB_mongo } from "../constants/config";

let conn:Db;

const mongoDbConnect = async() => {

    try {
        const client = new MongoClient(DB_mongo.host);
        await client.connect()
        console.log("Connected successfully to mongoDB server");
        conn =  await client.db(DB_mongo.database);
         
    } catch (e:any) {
        console.log("Error with connection", e.stack);
        throw e; // Throw the error to be handled by the caller
    }
}

mongoDbConnect();


export const m_insertOne = async (collection:string, item:any):Promise<boolean> => {
    const result = await conn.collection(collection).insertOne(item);
    return result.acknowledged;
}

export const m_updateOne = async (collection:string, filter:any, update:any):Promise<boolean> => {
    const result = await conn.collection(collection).updateOne(filter, update);
    return result.acknowledged;
}

export const m_getOne = async (collection:string, filter:any):Promise<any> => {
    const result = await conn.collection(collection).findOne(filter);
    return result;
}

export const m_deleteOne = async (collection:string, filter:any):Promise<boolean> => {
    const result = await conn.collection(collection).deleteOne(filter);
    return result.acknowledged;
}

export const m_insertMany = async (collection:string, items:any[]):Promise<boolean> => {
    const result = await conn.collection(collection).insertMany(items);
    return result.acknowledged;
}

export const m_getAllItems = async (collection:string):Promise<any[]> => {
    const result = await conn.collection(collection).find().toArray();
    return result;
}
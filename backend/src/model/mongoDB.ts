import { MongoClient, Db, MongoError } from "mongodb";

import { DB_mongo } from "../constants/config";

let conn: Db;

export const mongoDbConnect = async () => {
  try {
    const client = new MongoClient(DB_mongo.host);
    await client.connect();
    conn = await client.db(DB_mongo.database);
    console.log("Connected successfully to mongoDB server");
    conn
      .collection("coll_logs")
      .createIndex({ uid: 1, uploadDateAndTime: 1 }, { unique: true });
    conn.collection("coll_logs").createIndex({ uploadDateAndTime: 1 });
    conn
      .collection("coll_workout_data")
      .createIndex({ uid: 1, type: 1, uploadDateAndTime: 1 }, { unique: true });
    conn
      .collection("coll_user_workout_types")
      .createIndex({ uid: 1 }, { unique: true });
    conn
      .collection("coll_user_habits")
      .createIndex({ uid: 1 }, { unique: true });
    conn
      .collection("coll_notifications")
      .createIndex({ uid: 1 }, { unique: true });
  } catch (e: any) {
    mongoDbConnect();
    console.log("Error with connection", e.stack);
    throw e; // Throw the error to be handled by the caller
  }
};

mongoDbConnect();

export const m_insertOne = async (
  collection: string,
  item: any
): Promise<boolean> => {
  const result = await conn.collection(collection).insertOne(item);
  return result.acknowledged;
};

export const m_updateOne = async (
  collection: string,
  filter: any,
  update: any,
  options: any = {}
): Promise<boolean> => {
  const result = await conn
    .collection(collection)
    .updateOne(filter, update, options);
  return result.acknowledged;
};

export const m_getOne = async (
  collection: string,
  filter: any,
  fields: any = {}
): Promise<any> => {
  const result = await conn
    .collection(collection)
    .findOne(filter, { projection: fields });
  return result;
};

export const m_deleteOne = async (
  collection: string,
  filter: any
): Promise<boolean> => {
  const result = await conn.collection(collection).deleteOne(filter);
  return result.acknowledged;
};

export const m_insertMany = async (
  collection: string,
  items: any[]
): Promise<boolean> => {
  const result = await conn.collection(collection).insertMany(items);
  return result.acknowledged;
};

export const m_getAllItems = async (
  collection: string,
  filter: any,
  fields: any = {},
  sort: any = {}
): Promise<any[]> => {
  const result = await conn
    .collection(collection)
    .find(filter, { projection: fields })
    .sort(sort)
    .toArray();
  return result;
};

export const m_deleteMany = async (
  collection: string,
  filter: any
): Promise<boolean> => {
  const result = await conn.collection(collection).deleteMany(filter);
  return result.acknowledged;
};

export const m_runAggregation = async (
  collection: string,
  pipeline: any[]
): Promise<any[]> => {
  const result = await conn
    .collection(collection)
    .aggregate(pipeline)
    .toArray();
  return result;
};

export const m_getOneOrUpdate = async (
  collection: string,
  filter: any,
  update: any,
  options: any = { upsert: true, returnDocument: "after" }
): Promise<any> => {
  const result = await conn
    .collection(collection)
    .findOneAndUpdate(filter, update, options);
  return result;
};

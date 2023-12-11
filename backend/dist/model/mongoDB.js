"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m_getAllItems = exports.m_insertMany = exports.m_deleteOne = exports.m_getOne = exports.m_updateOne = exports.m_insertOne = void 0;
const mongodb_1 = require("mongodb");
const config_1 = require("../constants/config");
let conn;
const mongoDbConnect = async () => {
    try {
        const client = new mongodb_1.MongoClient(config_1.DB_mongo.host);
        await client.connect();
        console.log("Connected successfully to mongoDB server");
        conn = await client.db(config_1.DB_mongo.database);
    }
    catch (e) {
        console.log("Error with connection", e.stack);
        throw e; // Throw the error to be handled by the caller
    }
};
mongoDbConnect();
const m_insertOne = async (collection, item) => {
    const result = await conn.collection(collection).insertOne(item);
    return result.acknowledged;
};
exports.m_insertOne = m_insertOne;
const m_updateOne = async (collection, filter, update) => {
    const result = await conn.collection(collection).updateOne(filter, update);
    return result.acknowledged;
};
exports.m_updateOne = m_updateOne;
const m_getOne = async (collection, filter) => {
    const result = await conn.collection(collection).findOne(filter);
    return result;
};
exports.m_getOne = m_getOne;
const m_deleteOne = async (collection, filter) => {
    const result = await conn.collection(collection).deleteOne(filter);
    return result.acknowledged;
};
exports.m_deleteOne = m_deleteOne;
const m_insertMany = async (collection, items) => {
    const result = await conn.collection(collection).insertMany(items);
    return result.acknowledged;
};
exports.m_insertMany = m_insertMany;
const m_getAllItems = async (collection) => {
    const result = await conn.collection(collection).find().toArray();
    return result;
};
exports.m_getAllItems = m_getAllItems;
//# sourceMappingURL=mongoDB.js.map
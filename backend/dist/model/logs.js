"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodaysUids = exports.deleteLog = exports.getLogById = exports.updateHabits = exports.createHabits = exports.getHabits = exports.updateLog = exports.getTodaysLog = exports.addLog = void 0;
const mongodb_1 = require("mongodb");
const helpers_1 = require("../helpers");
const mongoDB_1 = require("./mongoDB");
const addLog = async (log) => {
    return await (0, mongoDB_1.m_insertOne)("coll_logs", log);
};
exports.addLog = addLog;
const createTodaysLog = async (uid) => {
    const { habits } = (await (0, exports.getHabits)(uid));
    const log = { uid, uploadDateAndTime: new Date() };
    for (let i = 0; i < habits.length; i++) {
        log[habits[i]] = false;
    }
    return log;
};
//TODO: need to make this ever better. It needs to be able to update if new habits have been added today.
const getTodaysLog = async (uid, startOfDay, endOfDay) => {
    const result = await (0, mongoDB_1.m_getOne)("coll_logs", {
        uid,
        uploadDateAndTime: { $gte: startOfDay, $lte: endOfDay },
    });
    if (result)
        return result;
    await (0, exports.addLog)(await createTodaysLog(uid));
    const secondResults = await (0, mongoDB_1.m_getOne)("coll_logs", {
        uid,
        uploadDateAndTime: { $gte: startOfDay, $lte: endOfDay },
    });
    // console.log({ uid, uploadDateAndTime:{$gte:startOfDay, $lte:startOfDay} })
    return secondResults;
};
exports.getTodaysLog = getTodaysLog;
const updateLog = async (_id, log) => {
    return await (0, mongoDB_1.m_updateOne)("coll_logs", { _id: new mongodb_1.ObjectId(_id) }, { $set: log });
};
exports.updateLog = updateLog;
const getHabits = async (uid) => {
    const result = await (0, mongoDB_1.m_getOne)("coll_user_habits", { uid });
    if (result)
        return { habits: result.habits };
    await (0, exports.createHabits)(uid);
    const secondResults = await (0, mongoDB_1.m_getOne)("coll_user_habits", { uid });
    return { habits: secondResults.habits };
};
exports.getHabits = getHabits;
const createHabits = async (uid) => {
    return await (0, mongoDB_1.m_insertOne)("coll_user_habits", { uid, habits: [] });
};
exports.createHabits = createHabits;
const updateHabits = async (data) => {
    const { uid, newHabits } = data;
    await (0, mongoDB_1.m_updateOne)("coll_user_habits", { uid }, { $addToSet: { habits: { $each: newHabits } } });
    const [startOfDay, endOfDay] = (0, helpers_1.startAndEndOfDay)();
    const todaysLog = (await (0, exports.getTodaysLog)(uid, startOfDay, endOfDay));
    const { _id } = todaysLog;
    for (let i = 0; i < newHabits.length; i++) {
        if (!todaysLog?.[newHabits[i]]) {
            todaysLog[newHabits[i]] = false;
        }
    }
    delete todaysLog._id;
    return await (0, exports.updateLog)(String(_id), todaysLog);
};
exports.updateHabits = updateHabits;
const getLogById = async (id) => {
    return await (0, mongoDB_1.m_getOne)("coll_logs", { _id: new mongodb_1.ObjectId(id) });
};
exports.getLogById = getLogById;
const deleteLog = async (id) => {
    return await (0, mongoDB_1.m_deleteOne)("coll_logs", { id });
};
exports.deleteLog = deleteLog;
const getTodaysUids = async () => {
    const [startOfDay, endOfDay] = (0, helpers_1.startAndEndOfDay)();
    const pipeline = [
        { $match: { uploadDateAndTime: { $gte: startOfDay, $lte: endOfDay } } },
        { $project: { _id: 0, uid: "$uid" } },
    ];
    const result = await (0, mongoDB_1.m_runAggregation)("coll_logs", pipeline);
    const uids = result.map((item) => item.uid);
    return uids;
};
exports.getTodaysUids = getTodaysUids;
//# sourceMappingURL=logs.js.map
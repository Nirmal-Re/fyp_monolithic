"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllHabits = exports.addNewHabits = exports.getDailyLog = exports.addDailyLog = void 0;
const helpers_1 = require("../helpers");
const logs_1 = require("../model/logs");
//This function isn't finished yet
const addDailyLog = async (req, res) => {
    try {
        // const {} = req.body;
        const value = await (0, logs_1.addLog)(bodyValue);
        return res.status(200).send({ message: "Daily log added successfully" });
    }
    catch (e) {
        console.log("Error with adding daily log", e);
        res.status(400).send({ error: "Error with adding daily log" });
    }
};
exports.addDailyLog = addDailyLog;
const getDailyLog = async (req, res) => {
    try {
        const { uid } = req.body;
        const [startOfDay, endOfDay] = (0, helpers_1.startAndEndOfDay)();
        const value = await (0, logs_1.getTodaysLog)(uid, startOfDay, endOfDay);
        return res.status(200).json(value);
    }
    catch (e) {
        console.log("Error with getting daily log", e);
        res.status(400).send({ error: "Error with getting daily log" });
    }
};
exports.getDailyLog = getDailyLog;
const addNewHabits = async (req, res) => {
    try {
        const { uid, newHabits } = req.body;
        if (!newHabits)
            return res.status(400).send({ error: "No habits provided" });
        const value = await (0, logs_1.updateHabits)({ uid, newHabits: newHabits.toUpperCase().split(",") });
        if (value === true) {
            return res.status(200).send({ message: "Habits added successfully" });
        }
        ;
        return res.status(400).send({ error: "Error with adding habits" });
    }
    catch (e) {
        console.log("Error with adding habits", e);
        res.status(400).send({ error: "Error with adding habits" });
    }
};
exports.addNewHabits = addNewHabits;
const fetchAllHabits = async (req, res) => {
    try {
        const { uid } = req.body;
        const value = await (0, logs_1.getHabits)(uid);
        return res.status(200).json(value);
    }
    catch (e) {
        console.log("Error with adding habits", e);
        res.status(400).send({ error: "Error with adding habits" });
    }
};
exports.fetchAllHabits = fetchAllHabits;
//# sourceMappingURL=logs.js.map
import {Request, Response} from "express";
import { startAndEndOfDay, areSetsEqual} from "../helpers";

import {updateLog, getHabits, updateHabits, getTodaysLog, getLogById} from "../model/logs";


//This function isn't finished yet
export const addDailyLog = async (req: Request, res:Response) => {
    try {
        const bodyValue = req.body;
        const id = bodyValue._id;
        const bodyKeys = new Set(Object.keys(bodyValue));
        const todaysLog = await getLogById(id);
        const todayLogKeys = new Set(Object.keys(todaysLog));
        const value = areSetsEqual(bodyKeys, todayLogKeys);
        if (!value) return res.status(400).send({error: "Invalid log"});

        delete bodyValue._id;
        await updateLog(id, bodyValue);
        return res.status(200).send({message: "Daily log updated successfully"});
    } catch (e) {
        console.log("Error with adding daily log", e);
        res.status(400).send({error: "Error with adding daily log"});
    }
}

export const getDailyLog = async (req: Request, res:Response) => {
    try {
        const {uid} = req.body;
        const [startOfDay, endOfDay] = startAndEndOfDay();
        const value = await getTodaysLog(uid, startOfDay, endOfDay);
        return res.status(200).json(value);
    } catch (e) {
        console.log("Error with getting daily log", e);
        res.status(400).send({error: "Error with getting daily log"});
    }

}

export const addNewHabits = async (req: Request, res:Response) => {
    try {
        const {uid, newHabits} = req.body;
        if(!newHabits) return res.status(400).send({error: "No habits provided"});
        const value = await updateHabits({uid, newHabits: newHabits.toUpperCase().split(",")});
        if (value === true) {
            return res.status(200).send({message: "Habits added successfully"})
        };
        return res.status(400).send({error: "Error with adding habits"});
    } catch (e) {
        console.log("Error with adding habits", e);
        res.status(400).send({error: "Error with adding habits"});
    }
}

export const fetchAllHabits = async (req: Request, res:Response) => {
    try {
        const {uid} = req.body;
        const value = await getHabits(uid);
        return res.status(200).json(value);
    } catch (e) {
        console.log("Error with adding habits", e);
        res.status(400).send({error: "Error with adding habits"});
    }
}
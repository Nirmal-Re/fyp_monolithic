"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserLogData = void 0;
const reports_1 = require("../model/reports");
const getUserLogData = async (req, res) => {
    try {
        const { uid } = req.body;
        const stats = await (0, reports_1.getHabitStats)(uid);
        return res.status(200).send({ stats });
    }
    catch (e) {
        console.log("Error with adding daily log", e);
        res.status(400).send({ error: "Error with adding daily log" });
    }
};
exports.getUserLogData = getUserLogData;
//# sourceMappingURL=reports.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserLogData = void 0;
const report_1 = require("../model/report");
const getUserLogData = async (req, res) => {
    try {
        const { uid } = req.body;
        const stats = await (0, report_1.getHabitStats)(uid);
        return res.status(200).send({ stats });
    }
    catch (e) {
        console.log("Error with adding daily log", e);
        res.status(400).send({ error: "Error with adding daily log" });
    }
};
exports.getUserLogData = getUserLogData;
//# sourceMappingURL=report.js.map
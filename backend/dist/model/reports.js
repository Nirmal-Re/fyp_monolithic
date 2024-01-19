"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHabitStats = void 0;
const mongoDB_1 = require("./mongoDB");
const getHabitStats = async (userId) => {
    const pipeline = [
        { $match: { uid: Number(userId) } },
        { $sort: { uploadDateAndTime: 1 } },
        {
            $project: {
                _id: 0,
                uploadDateAndTime: 1,
                NoOfTrue: {
                    $size: {
                        $filter: {
                            input: { $objectToArray: "$$ROOT" },
                            cond: { $eq: ["$$this.v", true] },
                        },
                    },
                },
                NoOfFalse: {
                    $size: {
                        $filter: {
                            input: { $objectToArray: "$$ROOT" },
                            cond: { $eq: ["$$this.v", false] },
                        },
                    },
                },
            },
        },
    ];
    const result = await (0, mongoDB_1.m_runAggregation)("coll_logs", pipeline);
    return result;
};
exports.getHabitStats = getHabitStats;
//# sourceMappingURL=reports.js.map
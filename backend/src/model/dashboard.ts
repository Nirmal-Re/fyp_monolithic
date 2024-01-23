import { m_runAggregation } from "./mongoDB";

export const getHabitStats = async (userId: string): Promise<any[]> => {
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
  const result = await m_runAggregation("coll_logs", pipeline);
  return result;
};

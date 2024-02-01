import cron from "node-cron";
import { getTodaysUids } from "../model/logs";
import {
  deletePastNotifications,
  addNotification,
} from "../model/notification";

interface Notification {
  uid: Number;
  msg: string;
}

// Run once a day at 23:55
cron.schedule("55 23 * * *", async () => {
  deletePastNotifications();
});

//TODO change it to every hour
cron.schedule("0 * * * *", async () => {
  console.log("Generating notifications...");
  // Get all users
  const users = await getTodaysUids();
  // Generate a notification for each user
  for (const user of users) {
    const notification: Notification = {
      uid: user,
      msg: "This is your hourly notification",
    };
    addNotification(notification);
  }
});

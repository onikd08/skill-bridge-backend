import cron from "node-cron";
import { prisma } from "./prisma";

export const initCronJobs = () => {
  // Runs every 5 minutes
  cron.schedule("*/5 * * * *", async () => {
    console.log("Checking for completed bookings...");
    try {
      await prisma.booking.updateMany({
        where: {
          status: "CONFIRMED",
          availability: {
            endTime: { lt: new Date() },
          },
        },
        data: { status: "COMPLETED" },
      });
    } catch (error) {
      console.error("Cron Job Error:", error);
    }
  });
};

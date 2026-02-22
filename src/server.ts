import app from "./app";
import config from "./config";
import { initCronJobs } from "./lib/cron";
import { prisma } from "./lib/prisma";

const port = config.port || 4000;

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to database successfully");

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });

    initCronJobs();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();

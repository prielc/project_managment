import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const contentDomains = ["כללי", "טכנולוגיה", "מבצעי"];
const weaponSystems = ["כללי", "מערכת א'", "מערכת ב'"];
const analysts = ["לא משויך"];

async function main() {
  for (const name of contentDomains) {
    await prisma.contentDomain.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  for (const name of weaponSystems) {
    await prisma.weaponSystem.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  for (const name of analysts) {
    await prisma.analyst.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

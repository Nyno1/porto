import { prisma } from "../lib/prisma";

async function main() {
  const users = await prisma.user.findMany({
    select: { name: true, email: true, role: true },
  });

  console.log("Semua user:");
  console.table(users);
}

main()
  .catch((err) => console.error(err))
  .finally(() => process.exit(0));

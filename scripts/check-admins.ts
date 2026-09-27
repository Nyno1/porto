import { prisma } from "../lib/prisma";

async function main() {
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    select: { name: true, email: true, role: true },
  });

  console.log("Daftar ADMIN:");
  console.table(admins);
}

main()
  .catch((err) => console.error(err))
  .finally(() => process.exit(0));

import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const [email, password] = process.argv.slice(2);

  if (!email || !password) {
    console.error("Usage: npx tsx scripts/set-password.ts <email> <password>");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.update({
    where: { email },
    data: { passwordHash },
  });

  console.log(`? Password untuk ${user.email} berhasil diganti`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => process.exit(0));

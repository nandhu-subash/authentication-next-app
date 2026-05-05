/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash("1234", 10)

  await prisma.user.create({
    data: {
      email: "admin@test.com",
      password
    }
  })

  console.log("✅ User created successfully")
}

main()
  .catch((e) => {
    console.error("❌ Error:", e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
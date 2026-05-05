import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "../../auth/[...nextauth]/route"
export async function PUT(req: Request, { params }: any) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params;
  console.log("Updating task with ID:", id) // debug
  const body = await req.json()

  // 🔒 Check ownership
  const existing = await prisma.task.findUnique({
    where: { id }
  })
console.log("SESSION USER ID:", session.user.id)
console.log("TASK USER ID:", existing?.userId)
  if (!existing || existing.userId !== session?.user?.id) {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }

  const updated = await prisma.task.update({
    where: { id },
    data: { title: body.title }
  })

  return Response.json(updated)
}
export async function DELETE(_: Request, { params }: any) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params;

  // 🔒 Ownership check
  const existing = await prisma.task.findUnique({
    where: { id }
  })
  if (!existing || existing.userId !== session.user.id) {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }

  await prisma.task.delete({
    where: { id }
  })

  return Response.json({ success: true })
}
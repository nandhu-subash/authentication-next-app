import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"  // 🔥 IMPORTANT
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  console.log("Session in POST /api/tasks:", session)

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const task = await prisma.task.create({
    data: {
      title: body.title,
      userId: session.user.id
    }
  })

  return Response.json(task)
}

export async function GET() {
  const session = await getServerSession(authOptions)

  console.log("Session in GET /api/tasks:", session)

  // 🔒 Auth check
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        id: "desc"
      }
    })

    return Response.json(tasks)
  } catch (error) {
    console.error("GET TASKS ERROR:", error)
    return Response.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    )
  }
}
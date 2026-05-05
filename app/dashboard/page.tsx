'use client'

import { useEffect, useState } from "react"

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([])
  const [title, setTitle] = useState("")

  const load = async () => {
    const res = await fetch("/api/tasks")
    setTasks(await res.json())
  }

  useEffect(() => {
    load()
  }, [])

  const create = async () => {
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    })
    setTitle("")
    load()
  }

  const update = async (id: string) => {
    const newTitle = prompt("New title")
    if (!newTitle) return

    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle })
    })

    load()
  }

  const remove = async (id: string) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE"
    })
    load()
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={create}>Add</button>

      {tasks?.map((t) => (
        <div key={t.id}>
          <span>{t.title}</span>
          <button onClick={() => update(t.id)}>Edit</button>
          <button onClick={() => remove(t.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
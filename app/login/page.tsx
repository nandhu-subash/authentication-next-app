'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div>
      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />

      <button onClick={() =>
        signIn("credentials", {
          email,
          password,
          callbackUrl: "/dashboard"
        })
      }>
        Login
      </button>
    </div>
  )
}
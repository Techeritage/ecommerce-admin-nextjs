'use client';
import { signIn } from "next-auth/react"

export default function Page() {

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div>
        <button className="border p-1" onClick={() => signIn('google')}>
          Login as an Admin
        </button>
      </div>
    </main>
  )
}

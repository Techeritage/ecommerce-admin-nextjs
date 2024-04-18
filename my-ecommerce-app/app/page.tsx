import Link from "next/link";

export default function Page() {

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div>
        <Link href='/dashboard'>
          Login as an Admin
        </Link>
      </div>
    </main>
  )
}

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { sql } from '@vercel/postgres'

export default async function HomePage() {
  const cookieStore = await cookies()
  const userEmail = cookieStore.get('user')
  
  if (!userEmail) {
    redirect('/login')
  }

  // Get user details
  const user = await sql`
    SELECT name FROM users WHERE email=${userEmail.value}
  `

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center mb-4">
        Welcome to Panari Resort Booking System
      </h1>
      <p className="text-xl text-gray-600">
        Hello, {user.rows[0].name}!
      </p>
      <form action="/api/auth/logout" method="post" className="mt-4">
        <button 
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </form>
    </main>
  )
}
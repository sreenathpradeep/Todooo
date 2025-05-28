'use client'

import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const { data: session } = useSession() // ✅ Define session here
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/app')
    }
  }, [session, router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to FocusFlow</h1>
      <p className="text-gray-500 mb-6">
        A beautifully simple task manager. Built with React + Next.js.
      </p>
      <button
        onClick={() => signIn('google')}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Sign In with Google
      </button>
    </main>
  )
}

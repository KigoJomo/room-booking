import Link from 'next/link'
import { LoginForm } from '@/app/ui/login-form'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <LoginForm />
      <p>
        Don&apos;t have an account?{' '}
        <span>
          <Link href={'/sign-up'} className='text-blue-700 underline'>Sign Up</Link>
        </span>
      </p>
    </main>
  )
}

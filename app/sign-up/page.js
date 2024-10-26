import Link from 'next/link'
import { SignupForm } from '../ui/signup-form'

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <SignupForm />
      <p>
        Already have an account?{' '}
        <span>
          <Link href={'/login'} className='text-blue-700 underline'>Log in</Link>
        </span>
      </p>
    </main>
  )
}

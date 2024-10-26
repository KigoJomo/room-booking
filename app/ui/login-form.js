// app/ui/login-form.js
'use client'

import React, { useState } from 'react'
import { login } from '@/app/actions/auth'
import Input from '../components/Input'

function SubmitButton({ pending }) {
  return (
    <button 
      type='submit' 
      className='w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50'
      disabled={pending}
    >
      {pending ? 'Logging in...' : 'Log In'}
    </button>
  )
}

export function LoginForm() {
  const [error, setError] = useState(null)
  const [pending, setPending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setPending(true)

    const formData = new FormData(e.target)
    const result = await login(formData)

    setPending(false)

    if (result?.error) {
      setError(result.error)
    } else {
      // If successful, the login function should handle the redirect
      // so we don't need to do anything here.
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <Input 
        name="email" 
        label="Email" 
        placeholder="Enter your email" 
        type="email" 
        required 
      />
      
      <Input 
        name="password" 
        label="Password" 
        placeholder="Enter your password" 
        type="password" 
        required 
      />

      <SubmitButton pending={pending} />
    </form>
  )
}
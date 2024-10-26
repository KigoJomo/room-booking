// app/ui/signup-form.js
'use client';

import React, { useState } from 'react';
import { signup } from '@/app/actions/auth';
import Input from '../components/Input';

function SubmitButton({ pending }) {
  return (
    <button 
      type='submit' 
      className='w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50'
      disabled={pending}
    >
      {pending ? 'Signing up...' : 'Sign Up'}
    </button>
  );
}

export function SignupForm() {
  const [state, setState] = useState({ error: null, pending: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, pending: true, error: null }));

    const formData = new FormData(e.target);

    try {
      await signup(formData);
      // Handle successful signup if needed
    } catch (error) {
      setState({ error: error.message, pending: false });
    } finally {
      setState((prev) => ({ ...prev, pending: false }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-center">Create an Account</h1>
      
      {state.error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {state.error}
        </div>
      )}

      <Input 
        name="name" 
        label="Name" 
        placeholder="Enter your name" 
        required 
      />
      
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

      <SubmitButton pending={state.pending} />
    </form>
  );
}

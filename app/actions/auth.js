// app/actions/auth.js

'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { hash, compare } from 'bcrypt'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'

export async function signup(formData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  try {
    if (!name || !email || !password) {
      return { error: 'All fields are required' }
    }
    if (password.length < 8) {
      return { error: 'Password must be at least 8 characters' }
    }

    const hashedPassword = await hash(password, 10)

    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `

    // Await setting the cookie
    const cookiesStore = await cookies();

    // Await setting the cookie
    cookiesStore.set('user', email, { secure: true });
  } catch (error) {
    if (error.code === '23505') {
      return { error: 'Email already exists' }
    }
    console.error('Signup error:', error)
    return { error: 'Something went wrong. Please try again.' }
  }    
  // Redirect after setting the cookie
  redirect('/')
}

export async function login(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    if (!email || !password) {
      return { error: 'All fields are required' };
    }

    const user = await sql`
      SELECT * FROM users WHERE email=${email}
    `;

    if (user.rows.length === 0) {
      return { error: 'Invalid credentials' };
    }

    const passwordMatch = await compare(password, user.rows[0].password);
    if (!passwordMatch) {
      return { error: 'Invalid credentials' };
    }

    // Await setting the cookie
    const cookiesStore = await cookies();

    // Await setting the cookie
    cookiesStore.set('user', email, { secure: true });

    // // Redirect on successful login
    // NextResponse.redirect('/');
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Something went wrong. Please try again.' };
  }
  // Redirect on successful login
  redirect('/');
}

export async function logout() {
  cookies().delete('user')
  redirect('/login')
}
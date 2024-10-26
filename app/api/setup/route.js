import { createUsersTable } from '@/app/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await createUsersTable();
    return NextResponse.json({ message: 'Database setup completed' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
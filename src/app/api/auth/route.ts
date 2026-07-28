import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: 'Traditional password login has been permanently disabled. Please use Google Sign-In with an authorized email account.',
    },
    { status: 410 }
  );
}

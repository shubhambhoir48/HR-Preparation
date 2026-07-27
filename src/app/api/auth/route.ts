import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const expectedEmail = process.env.ADMIN_EMAIL || 'admin@hrmastery.com';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'hrlead2026';

    if (email.toLowerCase().trim() === expectedEmail.toLowerCase() && password === expectedPassword) {
      return NextResponse.json({
        success: true,
        user: { email: expectedEmail, name: 'HR Lead Admin' }
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid credentials. Please enter valid email & password.'
    }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const expectedEmail = process.env.ADMIN_EMAIL || 'priyankavartak17@gmail.com';
    const expectedPassword = process.env.ADMIN_PASSWORD || '123456789';

    if (email.toLowerCase().trim() === expectedEmail.toLowerCase() && password === expectedPassword) {
      return NextResponse.json({
        success: true,
        user: { email: expectedEmail, name: 'Priyanka Vartak' }
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

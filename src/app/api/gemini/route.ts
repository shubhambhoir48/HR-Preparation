import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, systemInstruction } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'GEMINI_API_KEY environment variable is not configured. Please set GEMINI_API_KEY in your .env.local or Netlify Environment Variables.'
      }, { status: 400 });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    const payload: any = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    if (systemInstruction) {
      payload.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({ success: true, text: text || 'No response generated.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

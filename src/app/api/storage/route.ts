import { NextResponse } from 'next/server';
import { getAppStateFromStore, saveAppStateToStore } from '@/lib/netlify-blobs';

export async function GET() {
  const data = await getAppStateFromStore();
  return NextResponse.json({ success: true, data });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const saved = await saveAppStateToStore(body);
    return NextResponse.json({ success: true, saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

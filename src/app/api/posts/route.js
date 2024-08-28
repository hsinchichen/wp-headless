import { getPost } from '@/data/getPost';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await getPost();
  return NextResponse.json({ data });
}

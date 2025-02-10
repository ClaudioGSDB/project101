import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  return NextResponse.json({mictest: 'hello'}, { status: 404 });
}
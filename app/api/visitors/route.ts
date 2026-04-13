import { NextResponse } from 'next/server';

// Simple visitor counter (in-memory for demo; replace with KV in production)
let totalVisitors = 12847;
let todayVisitors = 142;

export async function GET() {
  return NextResponse.json({ today: todayVisitors, total: totalVisitors });
}

export async function POST() {
  totalVisitors++;
  todayVisitors++;
  return NextResponse.json({ today: todayVisitors, total: totalVisitors, success: true });
}

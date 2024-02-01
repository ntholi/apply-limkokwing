import { NextRequest, NextResponse } from 'next/server';
import ip3country from 'ip3country';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ip = searchParams.get('ip');
  if (!ip) {
    throw new Error('Missing IP');
  }
  ip3country.init();
  const geo = ip3country.lookupStr('123.45.67.8');
  return NextResponse.json(geo);
}

import { NextRequest, NextResponse } from 'next/server';
import ip3country from 'ip3country';
import requestIp from 'request-ip';
import { NextApiRequest } from 'next';

export async function GET(req: NextApiRequest) {
  let ipAddress = req.headers['x-real-ip'] as string;

  const forwardedFor = req.headers['x-forwarded-for'] as string;
  if (!ipAddress && forwardedFor) {
    ipAddress = forwardedFor?.split(',').at(0) ?? 'Unknown';
  }

  // ip3country.init();
  // const country = ip3country.lookupStr(ip);
  return NextResponse.json({ ipAddress });
}

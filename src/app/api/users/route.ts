// import { adminAuth } from '@/lib/config/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  if (!email) {
    return NextResponse.json(
      {
        error: 'Missing email',
      },
      { status: 400 }
    );
  }
  // try {
  //   const user = await adminAuth.getUserByEmail(email);
  //   return NextResponse.json({
  //     exists: user ? true : false,
  //   });
  // } catch (error) {
  //   return NextResponse.json({
  //     exists: false,
  //   });
  // }
  return NextResponse.json({ message: 'Commented out for now.' });
}

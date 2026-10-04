import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 400 });
    }

    // Here we would verify the token with firebase-admin
    // For now, we simulate the process since firebase-admin needs a service account key
    
    // Simulating token decoding:
    const uid = 'simulated-uid-' + Math.random().toString(36).substring(7);
    const email = 'user@example.com';
    
    // Database operation
    const user = await prisma.user.upsert({
      where: { firebaseUid: uid },
      update: {},
      create: {
        firebaseUid: uid,
        email: email,
        subscriptionStatus: 'FREE'
      },
    });
    
    console.log(`Backend connected: Authenticated user ${email} with ID ${uid}`);

    return NextResponse.json({ 
      success: true, 
      message: 'User synced with PostgreSQL successfully (Mocked)',
      user: {
        id: uid,
        email,
        subscriptionStatus: 'FREE'
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

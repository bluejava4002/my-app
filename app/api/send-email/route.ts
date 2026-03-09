import { emailQueue } from '@/lib/queue'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, name } = await request.json()

  // Ajoute un job dans la queue
  await emailQueue.add('welcome-email', {
    email,
    name,
    sentAt: new Date().toISOString()
  })

  return NextResponse.json({ 
    success: true, 
    message: `Email en attente d'envoi pour ${email}` 
  })
}
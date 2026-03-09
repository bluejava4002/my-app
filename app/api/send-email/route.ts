import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, name } = await request.json()

  await new Promise(resolve => setTimeout(resolve, 1000))

  console.log(`Email simulé envoyé à ${email} (${name})`)

  return NextResponse.json({
    success: true,
    message: "Email envoyé !"
  })
}

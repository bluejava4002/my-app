"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleSignup() {
    setLoading(true)
    setError("")

    const { error: authError } = await supabase.auth.signUp({
      email,
      password
    })

    if (authError) {
      setError(authError.message)
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Inscription</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {success && (
            <p className="text-green-500 text-sm">
              {"Compte créé ! Vérifiez votre email pour confirmer."}
            </p>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Mot de passe (min 6 caractères)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleSignup} disabled={loading}>
            {loading ? "Inscription..." : "Créer mon compte"}
          </Button>
          <p className="text-center text-sm text-gray-500">
            {"Déjà un compte ? "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Se connecter
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}

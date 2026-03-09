"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestQueue() {
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSendEmail() {
    setLoading(true)
    setResponse(null)

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          name: "Marvin",
        }),
      })

      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (err) {
      setResponse(`Erreur: ${err instanceof Error ? err.message : "inconnue"}`)
    }

    setLoading(false)
  }

  return (
    <main className="p-10 max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Test Queue Email</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={handleSendEmail} disabled={loading}>
            {loading ? "Envoi en cours..." : "Envoyer un email test"}
          </Button>
          {response && (
            <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
              {response}
            </pre>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

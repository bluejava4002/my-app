"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit() {
    setLoading(true)

    const { error } = await supabase
      .from("posts")
      .insert({ title, content })

    if (error) {
      console.error(error)
    } else {
      setSuccess(true)
      setTitle("")
      setContent("")
    }

    setLoading(false)
  }

  return (
    <main className="p-10 max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Créer un nouveau post</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {success && (
            <p className="text-green-500">Post créé avec succès ! ✅</p>
          )}
          <Input
            placeholder="Titre du post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border rounded p-2 min-h-32 text-sm"
            placeholder="Contenu du post"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Envoi..." : "Publier le post"}
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams, useRouter } from "next/navigation"

export default function EditPost() {
  const { id } = useParams()
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single()

      if (data) {
        setTitle(data.title)
        setContent(data.content)
      }
    }
    fetchPost()
  }, [id])

  async function handleUpdate() {
    setLoading(true)
    await supabase
      .from("posts")
      .update({ title, content })
      .eq("id", id)

    setLoading(false)
    router.push("/")
  }

  return (
    <main className="p-10 max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Modifier le post</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border rounded p-2 min-h-32 text-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Mise à jour..." : "Sauvegarder"}
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
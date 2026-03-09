"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('posts')
        .select('*')
      if (data) setPosts(data)
    }
    fetchPosts()
  }, [])

  async function handleDelete(id: number) {
    await supabase
      .from('posts')
      .delete()
      .eq('id', id)
    setPosts(posts.filter((post) => post.id !== id))
  }

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mon Blog</h1>
        <Link href="/new-post">
          <Button>+ Nouveau post</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {posts?.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{post.title}</CardTitle>
                <div className="flex gap-2">
                  <Link href={`/edit-post/${post.id}`}>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">{post.content}</p>
              <p className="text-sm text-gray-400 mt-2">
                {new Date(post.created_at).toLocaleDateString('fr-FR')}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
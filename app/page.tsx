"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [posts, setPosts] = useState<{ id: number; title: string; content: string; created_at: string }[]>([])
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase.from('posts').select('*')
      if (data) setPosts(data)
    }

    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    fetchPosts()
    fetchUser()
  }, [])

  async function handleDelete(id: number) {
    await supabase.from('posts').delete().eq('id', id)
    setPosts(posts.filter((post) => post.id !== id))
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mon Blog</h1>
        <div className="flex gap-2">
          {user ? (
            <>
              <Link href="/new-post">
                <Button>+ Nouveau post</Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                Déconnexion
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline">Se connecter</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {posts?.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{post.title}</CardTitle>
                {user && (
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
                )}
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

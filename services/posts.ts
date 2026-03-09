import { supabase } from '@/lib/supabase'
import { Post } from '@/types'

// Récupérer tous les posts
export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Récupérer un post par ID
export async function getPostById(id: number): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// Créer un post
export async function createPost(title: string, content: string): Promise<Post> {
  const { data, error } = await supabase
    .from('posts')
    .insert({ title, content })
    .select()
    .single()

  if (error) throw error
  return data
}

// Modifier un post
export async function updatePost(id: number, title: string, content: string): Promise<Post> {
  const { data, error } = await supabase
    .from('posts')
    .update({ title, content })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Supprimer un post
export async function deletePost(id: number): Promise<void> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) throw error
}
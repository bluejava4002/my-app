import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b px-10 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Mon App</h1>
        <nav className="flex gap-4">
          <a href="/" className="text-gray-600 hover:text-black">Accueil</a>
          <a href="/about" className="text-gray-600 hover:text-black">About</a>
          <a href="/contact" className="text-gray-600 hover:text-black">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="text-center py-20 px-10">
        <h2 className="text-5xl font-bold mb-4">Bonjour, je suis Marvin 👋</h2>
        <p className="text-gray-500 text-xl mb-8">
          {"J'apprends React, Next.js et Tailwind CSS"}
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">Voir mes projets</Button>
          <Button size="lg" variant="outline">Me contacter</Button>
        </div>
      </section>

      {/* Cards */}
      <section className="px-10 pb-20">
        <h3 className="text-2xl font-bold text-center mb-8">Ce que j'apprends</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>⚛️ React</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                {"Composants, props, state, hooks — les bases du frontend moderne."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>▲ Next.js</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                {"Routing, Server Components, déploiement sur Vercel."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 Tailwind</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                {"Classes utilitaires pour styler rapidement sans CSS."}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

    </main>
  )
}
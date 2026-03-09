"use client"
import { useState } from "react"

// Un petit composant bouton
function Bouton({ texte }: { texte: string }) {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded">
      {texte}
    </button>
  )
}

// La page principale
export default function Home() {
  const [compteur, setCompteur] = useState(0)

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-4">Mon premier React !</h1>
      <p className="mb-4">Vous avez cliqué {compteur} fois</p>
      <Bouton texte="Cliquez-moi" />
      <button onClick={() => setCompteur(compteur + 1)}
        className="ml-4 bg-red-500 text-white px-4 py-2 rounded">
        +1
      </button>
    </main>
  )
}
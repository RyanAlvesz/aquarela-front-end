'use client'

import { useParams } from "next/navigation";

export default function Post() {

    const params = useParams()

    return (
      <main className="bg-blue-7 min-h-screen flex flex-col justify-between">
        <h1> Post {params.id} </h1>
      </main>
    );
}
  
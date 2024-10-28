import { Metadata } from 'next'
import Preferences from '@/components/pages/Preferences'
import { Category } from '@/types'
import { fetchWrapper } from '@/lib/api/fetch'
import { useEffect, useState } from 'react'

export const metadata: Metadata = {
  title: 'Preferências',
  description: "Escolha de preferências",
}

interface GetResp {
  categorias: Category[]
}

const Home = () => {

  const [categories, setCategories] = useState<Category[]>([])

  const url = 'v1/aquarela/categories'
  const options: RequestInit = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-cache',
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const resp = await fetchWrapper<GetResp>(url, options)
      setCategories(resp.categorias || [])
    }

    fetchCategories()
  }, [])

  return (
    <Preferences categories={categories} />
  )

}

export default Home
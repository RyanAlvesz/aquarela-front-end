'use client'

import ConfigTitle from "@/components/ui/buttons/ConfigTitle"
import CreateItemInput from "@/components/ui/inputs/CreateItemInput"
import Combobox from "@/components/ui/utils/Combobox"
import { fetchWrapper } from "@/lib/api/fetch"
import { Category } from "@/types"
import { useEffect, useState } from "react"

interface GetResp {
  categorias: Category[]
}

const CreatePublication = () => {

  const [categoriesArray, setCategoriesArray] = useState<Category[]>([])
  const [categories, setCategories] = useState<Category | null>(null)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])

  const handleCategorySelection = (category: Category) => {
    setSelectedCategories((prev) => {
      const exists = prev.some((item) => item.id === category.id)
      return exists
        ? prev.filter((item) => item.id !== category.id)
        : [...prev, category]
    })
    console.log(setSelectedCategories);
  }

  const fetchCategories = async () => {
    const url = 'v1/aquarela/categories'
    const options: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    }
    const resp = await fetchWrapper<GetResp>(url, options)
    setCategoriesArray(resp.categorias)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleSubmit = () => {

  }

  return (
    <main className="bg-blue-7 min-h-screen flex flex-col gap-6 justify-center p-4 md:py-8 md:bg-transparent md:h-fit md:grow">
      <ConfigTitle text="Criar publicação" returnButton desktopReturnButton />
      <form onSubmit={handleSubmit} className="grow flex flex-col md:flex px-4">
        <fieldset className="">

        </fieldset>
        <fieldset className="flex flex-col gap-3">
          <CreateItemInput
            label="Título"
            onChange={setTitle}
            type="text"
            value={title}
          />
          <CreateItemInput
            label="Descrição"
            onChange={setDescription}
            type="text"
            value={description}
          />
          <Combobox
            items={categoriesArray}
            onChange={handleCategorySelection} 
            value={categories} 
            getItemLabel={(category) => category.nome} 
            label="Categorias"
          />
        </fieldset>
      </form>
    </main>
  )

}

export default CreatePublication

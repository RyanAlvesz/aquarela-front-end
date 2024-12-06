'use client'

import ConfigTitle from "@/components/ui/buttons/ConfigTitle"
import GradientButton from "@/components/ui/buttons/GradientButton"
import CreateItemInput from "@/components/ui/inputs/CreateItemInput"
import Combobox from "@/components/ui/utils/Combobox"
import SelectedCategory from "@/components/ui/utils/SelectedCategory"
import { fetchWrapper } from "@/lib/api/fetch"
import { Category, DetailedPublication } from "@/types"
import Image from "next/image"
import { useEffect, useState } from "react"
import { RootState, useAppSelector } from "@/store/store"
import alert, { confirmAlert } from "@/types/alert"
import { useParams, useRouter } from "next/navigation"
import LoadingMessage from "@/components/ui/utils/LoadingMessage"

interface GetRespCategory {
  categorias: Category[]
}

interface GetRespPublication extends GetRespPost {
  postagem: DetailedPublication[]
}

interface GetRespPost {
  status_code: number
}

const EditPublication = () => {

  const params = useParams()
  const router = useRouter()
  const postId = params.id
  const [publication, setPublication] = useState<DetailedPublication | null>(null)
  const currentUser = useAppSelector((state: RootState) => state.user)
  const [categoriesArray, setCategoriesArray] = useState<Category[]>([])
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [image, setImage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true);

  const handleCategorySelection = (category: Category) => {
    setSelectedCategories((prevSelected) => {
      const isSelected = prevSelected.some((item) => item.id === category.id)
      if (isSelected) {
        setCategoriesArray((prevCategories) => [...prevCategories, category])
        return prevSelected.filter((item) => item.id !== category.id)
      } else {
        setCategoriesArray((prevCategories) =>
          prevCategories.filter((item) => item.id !== category.id)
        )
        return [...prevSelected, category]
      }
    })
  }

  const fetchPublicationData = async () => {

    const url: string = `v1/aquarela/post?post=${postId}&client=${currentUser.id}`
    const options: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    }

    try {
      const resp = await fetchWrapper<GetRespPublication>(url, options)
      if (resp.status_code === 200 && resp.postagem) {
        setPublication(resp.postagem[0])
        setTitle(resp.postagem[0].nome)
        setDescription(resp.postagem[0].descricao)
        setImage(resp.postagem[0].imagens[0].url)
        setSelectedCategories(resp.postagem[0].categorias as Category[])
        setIsLoading(false)
      } else {
        setPublication(null)
      }
    } catch (error) {
      console.error(error)
    }

  }

  const fetchCategories = async () => {
    const url = 'v1/aquarela/categories'
    const options: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    }
    const resp = await fetchWrapper<GetRespCategory>(url, options)    
    setCategoriesArray(resp.categorias)
  }

  useEffect(() => {
    fetchPublicationData()
    fetchCategories()
  }, [])

  useEffect(() => {
    if(categoriesArray.length > 0 && selectedCategories.length > 0){
      const filteredCategories = categoriesArray.filter(
        (category) => !selectedCategories.some((selected) => selected.id === category.id)
      )
      setCategoriesArray(filteredCategories)
    }
  }, [selectedCategories])

  const handleRemoveCategory = (category: Category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.filter((item) => item.id !== category.id)
    )
    setCategoriesArray((prevCategories) => [...prevCategories, category])
  }

  const inputValidation = () => {

    let resp = true

    if (!title) {
      alert({
        icon: 'error',
        title: 'O título é obrigatório'
      })
      resp = false
    }

    if (selectedCategories.length === 0) {
      alert({
        icon: 'error',
        title: 'Escolha pelo menos 1 categoria'
      })
      resp = false
    }

    return resp

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    const validation = inputValidation()

    if (validation) {

      const url = 'v1/aquarela/post/' + publication?.id_publicacao
      const options: RequestInit = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: title,
          descricao: description || '',
          id_usuario: publication?.id_dono_publicacao,
          categorias: selectedCategories.map(category => category.id)
        })

      }

      try { 
        const resp = await fetchWrapper<GetRespPost>(url, options)
        if (resp.status_code == 200) {
          alert({
            icon: 'success',
            title: 'Publicação atualizada'
          })
        }
      } catch (error) {
        alert({
          icon: 'error',
          title: 'Erro ao atualizar'
        })
      }

    }

  }

  const handleDelete = async () => {

    const alertResp: boolean = await confirmAlert(
      {
        title: `Deletar publicação?`,
        icon: 'warning',
        description: 'Essa ação não poderá ser desfeita',
        confirmBtn: 'Deletar',
        declineBtn: 'Cancelar'
      }
    )

    if (alertResp) {
      const url: string = 'v1/aquarela/delete/post/' + publication?.id_publicacao
      const options: RequestInit = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      }
      const resp = await fetchWrapper(url, options)

      if (resp) {

        alert({
          icon: 'success',
          title: 'Publicação deletada com sucesso'
        })

        setTimeout(() => {
          router.push('/home/feed')
        }, 2500)

      }

    }

  }

  return (
    <main className="bg-blue-7 min-h-screen flex flex-col gap-6 justify-center p-4 md:py-8 md:bg-transparent md:min-h-fit md:gap-8 md:px-[15vw]">
      {isLoading ? (
          <LoadingMessage message="Carregando publicação" />
      ) : ( 
        <>
          <ConfigTitle text="Editar publicação" returnButton />
          <form onSubmit={(e) => handleSubmit(e)} className="grow flex flex-col px-4 gap-6 md:grid md:grid-cols-2 md:px-0 md:gap-12 md:h-fit">
            <Image
              src={image}
              alt="Imagem"
              width={500}
              height={500}
              className={`w-full h-auto object-contain rounded-md md:rounded-2xl`}
            />
            <fieldset className="flex flex-col gap-3 md:h-fit">
              <CreateItemInput
                label="Título"
                onChange={setTitle}
                type="text"
                value={title}
                className="md:[&>input]:h-14 md:[&>span]:text-xl"
              />
              <CreateItemInput
                label="Descrição"
                onChange={setDescription}
                type="text"
                value={description}
                className="md:[&>input]:h-14 md:[&>span]:text-xl"
              />
              <Combobox
                items={categoriesArray}
                strAtr="nome"
                selectItem={(category: Category) => handleCategorySelection(category)}
                noItemsLabel="Categoria não encontrada"
                label="Categoria"
                className="md:[&>input]:h-14 md:[&>span]:text-xl"
              />
              <div className="flex w-full flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <SelectedCategory
                    removeItem={() => handleRemoveCategory(category)}
                    category={category}
                    key={category.id}
                  />
                ))}
              </div>
              <div className="flex flex-col md:grid md:grid-cols-2 items-center justify-center w-full gap-2 md:gap-4">
                <GradientButton
                  className="w-full h-14 [&>p]:!text-xl md:[&>p]:!text-2xl md:h-16 mt-2"
                  direction="left"
                  label="Salvar"
                  primaryColor='blue-2'
                  secundaryColor='blue-3'
                />
                <GradientButton
                  className="w-full h-14 [&>p]:!text-xl md:[&>p]:!text-2xl md:h-16 mt-2"
                  direction="right"
                  label="Excluir"
                  primaryColor='blue-4'
                  secundaryColor='blue-3'
                  type="button"
                  onClick={handleDelete}
                />
              </div>
            </fieldset>
          </form>
        </>
      )}
    </main>
  )

}

export default EditPublication
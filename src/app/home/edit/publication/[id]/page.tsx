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
import addSVG from '$/public/images/svg/plus.svg'
import { RootState, useAppSelector } from "@/store/store"
import { uploadImage } from "@/lib/firebase/app"
import alert from "@/types/alert"
import { useParams } from "next/navigation"

interface GetRespCategory {
  categorias: Category[]
}

interface GetResPublication extends GetRespPost {
  postagem: DetailedPublication[]
}

interface GetRespPost {
  status_code: number
}

const CreatePublication = () => {

  const params = useParams()
  const postId = params.id
  const [publication, setPublication] = useState<DetailedPublication | null>(null)
  const currentUser = useAppSelector((state: RootState) => state.user)
  const [categoriesArray, setCategoriesArray] = useState<Category[]>([])
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [image, setImage] = useState<string>('')
  const [isImageUploaded, setIsImageUploaded] = useState(true)

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
      const resp = await fetchWrapper<GetResPublication>(url, options)
      if (resp.status_code === 200 && resp.postagem) {
        setPublication(resp.postagem[0])
        setTitle(resp.postagem[0].nome)
        setDescription(resp.postagem[0].descricao)
        setImage(resp.postagem[0].imagens[0].url)
        setSelectedCategories(resp.postagem[0].categorias as Category[])
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
    fetchCategories()
    fetchPublicationData()
  },[])

  const handleRemoveCategory = (category: Category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.filter((item) => item.id !== category.id)
    )
    setCategoriesArray((prevCategories) => [...prevCategories, category])
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsImageUploaded(false)
      const url = await uploadImage(file, '/user/' + currentUser.id + '/posts')
      if (url) {
        setImage(url)
        setTimeout(() => {
          setIsImageUploaded(true)
        }, 5000)
      } else {
        alert({ icon: 'error', title: 'Erro ao enviar imagem' })
      }
    }
  }

  const handleRemoveImage = () => {
    setImage('')
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

    if (!image) {
      alert({
        icon: 'error',
        title: 'Insira uma imagem'
      })
      resp = false
    }

    return resp

  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    const validation = inputValidation()

    if (validation) {

      const url = 'v1/aquarela/post'
      const options: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: title,
          descricao: description || '',
          id_usuario: currentUser.id,
          imagens: [
            {
              url: image
            }
          ],
          categorias: selectedCategories.map(category => category.id)
        })

      }

      try {
        const resp = await fetchWrapper<GetRespPost>(url, options)        
        if(resp.status_code == 201){
          alert({
            icon: 'success',
            title: 'Publicação criada com sucesso'
          })
        }
      } catch (error) {
        alert({
          icon: 'error',
          title: 'Erro ao publicar'
        })
      }

    }

  }

  return (
    <main className="bg-blue-7 min-h-screen flex flex-col gap-6 justify-center p-4 md:py-8 md:bg-transparent md:h-fit md:gap-8 md:px-[15vw]">
      <ConfigTitle text="Editar publicação" returnButton />
      <form onSubmit={(e) => handleSubmit(e)} className="grow flex flex-col px-4 gap-6 md:grid md:grid-cols-2 md:px-0 md:gap-12 md:h-fit">
        <label
          onClick={(e) => {
            if (image !== '') {              
              e.preventDefault()
            }
          }}
          htmlFor='image'
          className="w-full relative bg-blue-5/50 rounded-md md:rounded-2xl overflow-hidden cursor-pointer bg-center bg-cover bg-no-repeat"
          style={{
            height: image ? 'fit-content' : '60vh'
          }}
        >
          {image && (
            <Image
              src={image}
              alt="Imagem"
              width={500}
              height={500}
              className={`w-full h-auto object-contain`}
            />
          )}
          {isImageUploaded ? (
            <div
              className={` flex items-center justify-center absolute ${image == '' ?
                'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 h-auto' :
                'top-4 right-4 rotate-45 w-1/6 h-auto bg-blue-4/80 rounded-full p-1 md:w-[10%]'
                }`}
              onClick={() => {
                if (image !== '') {
                  handleRemoveImage()
                }
              }}
            >
              <Image
                src={addSVG}
                alt="Adicionar imagem"
                width={100}
                height={100}
                className={`w-full h-full`}
                priority
              />
            </div>
          ) : (
            <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16">
              <div className="image-loader !w-1/2 !h-1/2"></div>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image"
          />
        </label>
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
          <GradientButton
            className="w-full h-14 [&>p]:!text-xl md:[&>p]:!text-2xl md:h-16 mt-2"
            direction="left"
            label="Salvar"
            primaryColor='blue-2'
            secundaryColor='blue-3'
          />
        </fieldset>
      </form>
    </main>
  )

}

export default CreatePublication
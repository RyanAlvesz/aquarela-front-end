'use client'

import ConfigTitle from "@/components/ui/buttons/ConfigTitle"
import GradientButton from "@/components/ui/buttons/GradientButton"
import CreateItemInput from "@/components/ui/inputs/CreateItemInput"
import Combobox from "@/components/ui/utils/Combobox"
import SelectedCategory from "@/components/ui/utils/SelectedCategory"
import { fetchWrapper } from "@/lib/api/fetch"
import { Category } from "@/types"
import Image from "next/image"
import watermarkImage from "$/public/images/logo/watermark.png"
import { useEffect, useState } from "react"
import addSVG from '$/public/images/svg/plus.svg'
import { RootState, useAppSelector } from "@/store/store"
import { uploadImage } from "@/lib/firebase/app"
import alert from "@/types/alert"
import CreateItemCheckbox from "@/components/ui/inputs/CreateItemCheckbox"
import CreateItemNumberInput from "@/components/ui/inputs/CreateItemNumberInput"

interface GetResp {
  categorias: Category[]
}

interface GetRespProduct {
  status_code: number
}

const CreateProduct = () => {

  const currentUser = useAppSelector((state: RootState) => state.user)
  const [categoriesArray, setCategoriesArray] = useState<Category[]>([])
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [watermark, setWatermark] = useState<boolean>(false)
  const [digitalProduct, setDigitalProduct] = useState<boolean>(false)
  const [quantity, setQuantity] = useState<number>(1)
  const [price, setPrice] = useState<number>(5)
  const [priceWithTax, setPriceWithTax] = useState<number>(price * 1.1);
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
      const url = await uploadImage(file, '/user/' + currentUser.id + '/products')
      if (url) {
        setImage(url)
        setTimeout(() => {
          setIsImageUploaded(true)
        }, 250)
      } else {
        alert({ icon: 'error', title: 'Erro ao enviar imagem' })
      }
    }
  }

  useEffect(() => {
    setPriceWithTax(price * 1.1);
  }, [price])

  useEffect(() => {
    if(isNaN(quantity)){
      setQuantity(0);
    }
  }, [quantity])

  const handleRemoveImage = () => {
    setImage('')
  }

  const inputValidation = () => {

    let resp = true
    
    if (!image) {
      alert({
        icon: 'error',
        title: 'Insira uma imagem'
      })
      resp = false
    }

    if (!title) {
      alert({
        icon: 'error',
        title: 'O título é obrigatório'
      })
      resp = false
    }

    if (!description) {
      alert({
        icon: 'error',
        title: 'A descrição é obrigatória'
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

    if (priceWithTax < 5.5  || priceWithTax > 50000) {
      alert({
        icon: 'error',
        title: 'O valor do produto deve estar entre R$:5,5 e R$:50.000'
      })
      resp = false
    }
    
    if (quantity <= 0 && !isNaN(quantity)) {
      alert({
        icon: 'error',
        title: 'Insira uma quantidade maior que 0'
      })
      resp = false
    }

    return resp

  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    const validation = inputValidation()

    if (validation) {

      const url = 'v1/aquarela/product'
      const options: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: title,
          descricao: description,
          id_usuario: currentUser.id,
          marca_dagua: watermark,
          item_digital: digitalProduct,
          preco: priceWithTax,
          quantidade: quantity,
          imagens: [
            {
              url: image
            }
          ],
          categorias: selectedCategories.map(category => category.id)
        })

      }

      try {
        const resp = await fetchWrapper<GetRespProduct>(url, options)        
        if(resp.status_code == 201){
          alert({
            icon: 'success',
            title: 'Produto criado com sucesso'
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
      <ConfigTitle text="Criar produto" returnButton />
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
          {image && watermark && (
            <div
              className={`flex items-center justify-center absolute inset-0 rounded-md md:rounded-2xl pointer-events-none`}
            >
               <div
                  className="absolute bg-cover inset-0  w-[165%] h-[165%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12"
                  style={{
                      backgroundImage: `url(${watermarkImage.src})`
                  }}
              />
            </div>
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
          <CreateItemCheckbox
            label="Adicionar marca d'água"
            checked={watermark}
            setChecked={() => setWatermark(prev => !prev)}
            className="md:[&>div]:w-8 md:[&>div]:h-8 md:[&>span]:text-xl"
          />
          <CreateItemCheckbox
            label="Produto digital"
            checked={digitalProduct}
            setChecked={() => setDigitalProduct(prev => !prev)}
            className="md:[&>div]:w-8 md:[&>div]:h-8 md:[&>span]:text-xl"
          />
          <CreateItemNumberInput
            label="Preço por unidade"
            onChange={setPrice}
            type="price"
            value={price}
            className="md:[&>div]:h-14 md:[&>span]:text-xl"
          />
          <div className="flex flex-col w-full gap-1 my-2">
            <p className="text-blue-2 text-lg md:text-xl text-center animate-fade duration-75 ease-linear"> Taxa: 10%. </p>
            {!isNaN(priceWithTax) && (
              <p className="text-blue-1 text-lg md:text-xl text-center animate-fade duration-75 ease-linear"> Preço final: R$:{priceWithTax.toFixed(2).replace('.', ',')} </p>
            )}
          </div>
          <CreateItemNumberInput
            label="Quantidade disponível"
            onChange={setQuantity}
            type="number"
            value={quantity}
            className="md:[&>div]:h-14 md:[&>span]:text-xl md:[&>div>button]:w-14"
          />
          {!digitalProduct && (
            <p className="text-blue-2 text-center text-lg md:text-xl my-2 px-4 animate-fade duration-75 ease-linear">
              *O envio dos itens é sua responsabilidade
            </p>
          )}
          <GradientButton
            className="w-full h-14 [&>p]:!text-xl md:[&>p]:!text-2xl md:h-16 mt-2"
            direction="left"
            label="Publicar"
            primaryColor='blue-2'
            secundaryColor='blue-3'
          />
        </fieldset>
      </form>
    </main>
  )

}

export default CreateProduct
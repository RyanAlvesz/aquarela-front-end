'use client'

import ConfigTitle from "@/components/ui/buttons/ConfigTitle"
import GradientButton from "@/components/ui/buttons/GradientButton"
import CreateItemInput from "@/components/ui/inputs/CreateItemInput"
import Combobox from "@/components/ui/utils/Combobox"
import SelectedCategory from "@/components/ui/utils/SelectedCategory"
import { fetchWrapper } from "@/lib/api/fetch"
import { Category, DetailedProduct } from "@/types"
import Image from "next/image"
import watermarkImage from "$/public/images/logo/watermark.png"
import { useEffect, useState } from "react"
import { RootState, useAppSelector } from "@/store/store"
import alert, { confirmAlert } from "@/types/alert"
import CreateItemCheckbox from "@/components/ui/inputs/CreateItemCheckbox"
import CreateItemNumberInput from "@/components/ui/inputs/CreateItemNumberInput"
import { useParams, useRouter } from "next/navigation"
import LoadingMessage from "@/components/ui/utils/LoadingMessage"

interface GetRespCategory {
  categorias: Category[]
}

interface GetRespProduct extends GetRespPost {
  produto: DetailedProduct[]
}

interface GetRespPost {
  status_code: number
}

const EditProduct = () => {

  const params = useParams()
  const router = useRouter()
  const postId = params.id
  const [product, setProduct] = useState<DetailedProduct | null>(null)
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

  const fetchProductData = async () => {

    const url: string = `v1/aquarela/product?product=${postId}&client=${currentUser.id}`
    const options: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    }

    try {
      const resp = await fetchWrapper<GetRespProduct>(url, options)
      if (resp.status_code === 200 && resp.produto) {
        setProduct(resp.produto[0])
        setTitle(resp.produto[0].nome)
        setDescription(resp.produto[0].descricao)
        setImage(resp.produto[0].imagens[0].url)
        setWatermark(Boolean(Number(resp.produto[0].marca_dagua)))
        setDigitalProduct(Boolean(Number(resp.produto[0].item_digital)))
        setQuantity(resp.produto[0].quantidade)
        setPrice(parseFloat((resp.produto[0].preco / 1.1).toFixed(2)))
        setPriceWithTax(parseFloat(resp.produto[0].preco.toFixed(2)))
        setSelectedCategories(resp.produto[0].categorias as Category[])
        setIsLoading(false)
      } else {
        setProduct(null)
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
    fetchProductData()
    fetchCategories()
  }, [])

  useEffect(() => {
    if (categoriesArray.length > 0 && selectedCategories.length > 0) {
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

  useEffect(() => {
    setPriceWithTax(price * 1.1);
  }, [price])

  useEffect(() => {
    if (isNaN(quantity)) {
      setQuantity(0);
    }
  }, [quantity])

  const inputValidation = () => {

    let resp = true

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

    if (priceWithTax < 5.5 || priceWithTax > 50000) {
      alert({
        icon: 'error',
        title: 'O valor do produto deve estar entre R$:5,5 e R$:50.000'
      })
      resp = false
    }

    if (isNaN(priceWithTax) || isNaN(price)) {
      alert({
        icon: 'error',
        title: 'O produto deve ter um valor'
      })
      resp = false
    }

    return resp

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    const validation = inputValidation()

    if (validation) {

      const url = 'v1/aquarela/product/' + product?.id_publicacao
      const options: RequestInit = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: title,
          descricao: description,
          id_usuario: product?.id_dono_publicacao,
          marca_dagua: watermark,
          item_digital: digitalProduct,
          preco: priceWithTax,
          quantidade: quantity,
          categorias: selectedCategories.map(category => category.id)
        })

      }

      try {
        const resp = await fetchWrapper<GetRespPost>(url, options)
        if (resp.status_code == 200) {
          alert({
            icon: 'success',
            title: 'Produto atualizado'
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
        title: `Deletar produto?`,
        icon: 'warning',
        description: 'Essa ação não poderá ser desfeita',
        confirmBtn: 'Deletar',
        declineBtn: 'Cancelar'
      }
    )

    if (alertResp) {
      const url: string = 'v1/aquarela/products/' + product?.id_publicacao
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
          title: 'Produto deletada com sucesso'
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
        <LoadingMessage message="Carregando produto" />
      ) : (
        <>
          <ConfigTitle text="Editar produto" returnButton />
          <form onSubmit={(e) => handleSubmit(e)} className="grow flex flex-col px-4 gap-6 md:grid md:grid-cols-2 md:px-0 md:gap-12 md:h-fit">
            <div
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
              {watermark && (
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
            </div>
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
                <p className="text-blue-2 text-lg md:text-xl text-center animate-fade duration-75 ease-linear"> Taxa de serviço: 10%. </p>
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
              <div className="flex flex-col md:grid md:grid-cols-2 items-center justify-center w-full gap-2 md:gap-4">
                <GradientButton
                  className="w-full h-14 [&>p]:!text-xl md:[&>p]:!text-2xl md:h-16 mt-2"
                  direction="left"
                  label="Publicar"
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

export default EditProduct
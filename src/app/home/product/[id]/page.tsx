'use client'

import MobilePublicationHeader from "@/components/ui/navigation/MobilePublicationHeader";
import LoadingMessage from "@/components/ui/utils/LoadingMessage";
import { fetchWrapper } from "@/lib/api/fetch";
import { RootState, useAppSelector } from "@/store/store";
import { Comment, DetailedProduct } from "@/types";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import emptyHeartSVG from "$/public/images/svg/empty-heart.svg"
import filledHeartSVG from "$/public/images/svg/filled-heart.svg"
import emptyFavoriteSVG from "$/public/images/svg/empty-favorite.svg"
import filledFavoriteSVG from "$/public/images/svg/filled-favorite.svg"
import alert from "@/types/alert";
import UserDetails from "@/components/ui/utils/UserDetails";
import PublicationDetails from "@/components/ui/utils/PublicationDetails";
import CommentArea from "@/components/ui/layout/CommentArea";
import CommentBox from "@/components/ui/forms/CommentBox";
import SocialButtonArea from "@/components/ui/utils/SocialButtonArea";
import ItemImageBox from "@/components/ui/utils/ItemImageBox";
import BuyArea from "@/components/ui/layout/BuyArea";

interface getResp extends getRespFollow {
  produto: DetailedProduct[]
}

interface getRespComment extends getRespFollow {
  comentario: Comment
}

interface getRespFollow {
  status_code: number
}

const ProductPage: React.FC = () => {

  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const productId = params.id
  const user = useAppSelector((state: RootState) => state.user)
  const [product, setProduct] = useState<DetailedProduct | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [isFavorited, setIsFavorited] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [publicationOwner, setProductOwner] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [comment, setComment] = useState<string>('')
  const [hasVisualized, setHasVisualized] = useState(false)
  const [isFollowing, setIsFollowing] = useState<boolean>(Boolean(Number(product?.dono_publicacao.esta_seguindo)))
  const [isCreateFolderButton, setIsCreateFolderButton] = useState<boolean>(false)
  const [imageLoad, setImageLoad] = useState<boolean>(false)

  const handleImageLoad = (isLoaded: boolean) => {
    setImageLoad(isLoaded)
  }

  const fetchPublicationData = async () => {

    const url: string = `v1/aquarela/product?product=${productId}&client=${user.id as number}`
    const options: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    }

    try {
      const resp = await fetchWrapper<getResp>(url, options)
      if (resp.status_code === 200 && resp.produto) {
        setProduct(resp.produto[0])
        setProductOwner(resp.produto[0].id_dono_publicacao == user.id ? true : false)
        setIsFollowing(Boolean(Number(resp.produto[0]?.dono_publicacao.esta_seguindo)))
        setIsLiked(Boolean(Number(resp.produto[0]?.curtida)))
        setIsFavorited(Boolean(Number(resp.produto[0]?.favorito)))
        setComments(resp.produto[0]?.comentarios as Comment[])
      } else {
        setProduct(null)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }

  }

  const handleFollow = async () => {

    const url = 'v1/aquarela/follower/user'
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_seguidor: user.id,
        id_seguindo: product?.id_dono_publicacao
      })
    }

    try {
      const resp = await fetchWrapper<getRespFollow>(url, options)
      if (resp.status_code == 201) {
        setIsFollowing(prevState => !prevState)
      }
    } catch (error) {
      console.error(error)
    }

  }

  const handleProductFavorite = async () => {

    const newFavoritedState = !isFavorited
    setIsFavorited(newFavoritedState)

    const url = 'v1/aquarela/favorite/product'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_produto: product?.id_publicacao,
        id_usuario: user.id
      }),
    }

    const resp = await fetchWrapper(url, options)

    if (!resp) {
      setIsFavorited(isFavorited)
      return isFavorited
    }

    return newFavoritedState

  }

  const handlePublicationLike = async () => {

    const newLikedState = !isLiked
    setIsLiked(newLikedState)

    const url = 'v1/aquarela/like/product'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_produto: product?.id_publicacao,
        id_usuario: user.id
      }),
    }

    const resp = await fetchWrapper(url, options)

    if (!resp) {
      setIsLiked(isLiked)
      return isLiked
    }

    return newLikedState

  }

  const handleShare = async () => {
    await navigator.clipboard.writeText('https://aquarela-front-end.vercel.app' + pathname)
    alert({
      icon: 'success',
      title: 'Produto copiada para área de trasnferência'
    })
  }

  const handleEdit = () => {
    router.push('/home/edit/product/' + product?.id_publicacao)
  }

  const handleReturn = () => {
    router.back()
  }

  const handleSubmitComment = async () => {

    const url = 'v1/aquarela/comment/product'
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mensagem: comment,
        id_usuario: user.id,
        id_produto: productId,
        id_resposta: null
      })
    }

    try {
      const resp = await fetchWrapper<getRespComment>(url, options)
      if (resp.status_code == 201) {
        setComment('')
        await fetchPublicationData()
      }
    } catch (error) {
      console.error(error)
    }

  }

  useEffect(() => {
    fetchPublicationData()
  }, [])

  useEffect(() => {
    const visualizer = async () => {
      const url = 'v1/aquarela/visualizer/product'
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_produto: product?.id_publicacao,
          id_usuario: user.id,
        }),
      }
      await fetchWrapper(url, options)
    }

    if (!hasVisualized && !publicationOwner && product) {
      visualizer()
      setHasVisualized(true)
    }
  }, [hasVisualized, publicationOwner, product, user.id])
  
  return (
    <>
      {(loading && !imageLoad) ? (
        <LoadingMessage message="Procurando a obra no acervo..." />
      ) : product == null ? (
        <div className="absolute bg-blue-7 md:bg-white inset-0 flex flex-col gap-3 md:gap-8 items-center px-6 justify-center text-2xl md:text-title-mobile text-blue-1 font-medium text-center">
          Produto não encontrado!
          <button
            className="bg-blue-5/80 rounded-full ease-linear duration-100 hover:bg-blue-1 hover:[&>span]:text-white"
            onClick={handleReturn}
          >
            <span className="font-bold text-secondary-mobile md:text-secondary-desktop text-blue-1 uppercase py-2 px-4 md:px-8 md:py-6 flex ease-linear duration-100">Voltar ao museu</span>
          </button>
        </div>
      ) : (
        <main className="flex flex-col w-full md:grid md:grid-cols-[auto_auto] md:px-[6.5vw] md:gap-6 md:h-[80vh] md:mb-[5vh] md:justify-center md:w-fit">
          <MobilePublicationHeader createFolder={setIsCreateFolderButton} item={product} onFavorite={handleProductFavorite} />
          <ItemImageBox setImageLoad={handleImageLoad} isCreateFolderButton={isCreateFolderButton} setIsCreateFolderButton={setIsCreateFolderButton} item={product} onFavorite={handleProductFavorite} />
          <section className="grow flex flex-col h-full justify-between md:min-w-[calc((100vw-13vw-1.5rem)/2)]">
            <div className="flex flex-col w-full">
              <UserDetails
                edit={handleEdit}
                publication={product}
                publicationOwner={publicationOwner}
                isFollowing={isFollowing}
                follow={handleFollow}
              />
              <PublicationDetails
                className="[&>div]:!h-[10vh]"
                publication={product}
                like={handlePublicationLike}
                favorite={handleProductFavorite}
                share={handleShare}
                likeImage={isLiked == true ? filledHeartSVG : emptyHeartSVG}
                favoriteImage={isFavorited == true ? filledFavoriteSVG : emptyFavoriteSVG}
              />
              <BuyArea
                product={product} 
              />
            </div>
            <CommentArea className="[&>div]:md:max-h-[35vh]" refreshComments={fetchPublicationData} itemOwner={product.dono_publicacao} currentUser={user} comments={comments} />
            <div className="flex flex-col">
              <SocialButtonArea
                classname="hidden md:flex items-center gap-2 p-3"
                like={handlePublicationLike}
                favorite={handleProductFavorite}
                share={handleShare}
                likeImage={isLiked == true ? filledHeartSVG : emptyHeartSVG}
                favoriteImage={isFavorited == true ? filledFavoriteSVG : emptyFavoriteSVG}
              />
              <CommentBox
                user={user}
                comment={comment}
                handleSubmitComment={handleSubmitComment}
                setComment={setComment}
              />
            </div>
          </section>
        </main>
      )}
    </>
  )
}

export default ProductPage

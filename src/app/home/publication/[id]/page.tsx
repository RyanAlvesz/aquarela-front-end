'use client'

import MobilePublicationHeader from "@/components/ui/navigation/MobilePublicationHeader";
import LoadingMessage from "@/components/ui/utils/LoadingMessage";
import { fetchWrapper } from "@/lib/api/fetch";
import { RootState, useAppSelector } from "@/store/store";
import { Comment, DetailedPublication } from "@/types";
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

interface getResp extends getRespFollow {
  postagem: DetailedPublication[]
}

interface getRespComment extends getRespFollow {
  comentario: Comment
}

interface getRespFollow {
  status_code: number
}

const PublicationPage: React.FC = () => {

  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const postId = params.id
  const user = useAppSelector((state: RootState) => state.user)
  const [publication, setPublication] = useState<DetailedPublication | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [isFavorited, setIsFavorited] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [publicationOwner, setPublicationOwner] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [comment, setComment] = useState<string>('')
  const [hasVisualized, setHasVisualized] = useState(false)
  const [isFollowing, setIsFollowing] = useState<boolean>(Boolean(Number(publication?.dono_publicacao.esta_seguindo)))
  const [isCreateFolderButton, setIsCreateFolderButton] = useState<boolean>(false)

  const fetchPublicationData = async () => {

    const url: string = `v1/aquarela/post?post=${postId}&client=${user.id as number}`
    const options: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    }

    try {
      const resp = await fetchWrapper<getResp>(url, options)
      if (resp.status_code === 200 && resp.postagem) {
        setPublication(resp.postagem[0])
        setPublicationOwner(resp.postagem[0].id_dono_publicacao == user.id ? true : false)
        setIsFollowing(Boolean(Number(resp.postagem[0]?.dono_publicacao.esta_seguindo)))
        setIsLiked(Boolean(Number(resp.postagem[0]?.curtida)))
        setIsFavorited(Boolean(Number(resp.postagem[0]?.favorito)))
        setComments(resp.postagem[0]?.comentarios as Comment[])
      } else {
        setPublication(null)
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
        id_seguindo: publication?.id_dono_publicacao
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

  const handlePublicationFavorite = async () => {

    const newFavoritedState = !isFavorited
    setIsFavorited(newFavoritedState)

    const url = 'v1/aquarela/favorite/posts'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_postagem: publication?.id_publicacao,
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

    const url = 'v1/aquarela/like/posts'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_postagem: publication?.id_publicacao,
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
      title: 'Publicação copiada para área de trasnferência'
    })
  }

  const handleEdit = () => {
    router.push('/home/edit/publication/' + publication?.id_publicacao)
  }

  const handleReturn = () => {
    router.back()
  }

  const handleSubmitComment = async () => {

    const url = 'v1/aquarela/comment/post'
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mensagem: comment,
        id_usuario: user.id,
        id_postagem: postId,
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
      const url = 'v1/aquarela/visualizer/posts'
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_postagem: publication?.id_publicacao,
          id_usuario: user.id,
        }),
      }
      await fetchWrapper(url, options)
    }

    if (!hasVisualized && !publicationOwner && publication) {
      visualizer()
      setHasVisualized(true)
    }
  }, [hasVisualized, publicationOwner, publication, user.id])

  return (
    <>
      {loading ? (
        <LoadingMessage message="Procurando a obra no acervo..." />
      ) : publication == null ? (
        <div className="absolute bg-blue-7 md:bg-white inset-0 flex flex-col gap-3 md:gap-8 items-center px-6 justify-center text-2xl md:text-title-mobile text-blue-1 font-medium text-center">
          Publicação não encontrada!
          <button
            className="bg-blue-5/80 rounded-full ease-linear duration-100 hover:bg-blue-1 hover:[&>span]:text-white"
            onClick={handleReturn}
          >
            <span className="font-bold text-secondary-mobile md:text-secondary-desktop text-blue-1 uppercase py-2 px-4 md:px-8 md:py-6 2xl:px-12 2xl:py-6 flex ease-linear duration-100">Voltar ao museu</span>
          </button>
        </div>
      ) : (
        <main className="flex flex-col w-full md:grid md:grid-cols-[auto_auto] md:px-[6.5vw] md:gap-6 md:h-[80vh] md:justify-center ">
          <MobilePublicationHeader createFolder={setIsCreateFolderButton} item={publication} onFavorite={handlePublicationFavorite} />
          <ItemImageBox isCreateFolderButton={isCreateFolderButton} setIsCreateFolderButton={setIsCreateFolderButton} item={publication} onFavorite={handlePublicationFavorite} />
          <section className="grow flex flex-col h-full justify-between md:min-w-[calc((100vw-13vw-1.5rem)/2)]">
            <div className="flex flex-col w-full">
              <UserDetails
                edit={handleEdit}
                publication={publication}
                publicationOwner={publicationOwner}
                isFollowing={isFollowing}
                follow={handleFollow}
              />
              <PublicationDetails
                publication={publication}
                like={handlePublicationLike}
                favorite={handlePublicationFavorite}
                share={handleShare}
                likeImage={isLiked == true ? filledHeartSVG : emptyHeartSVG}
                favoriteImage={isFavorited == true ? filledFavoriteSVG : emptyFavoriteSVG}
              />
            </div>
            <CommentArea refreshComments={fetchPublicationData} itemOwner={publication.dono_publicacao} currentUser={user} comments={comments} />
            <div className="flex flex-col">
              <SocialButtonArea
                classname="hidden md:flex items-center gap-2 p-3"
                like={handlePublicationLike}
                favorite={handlePublicationFavorite}
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

export default PublicationPage

'use client'

import Image from "next/image"
import Avatar from "../buttons/Avatar"
import React, { useEffect, useState } from "react"
import { DetailedProduct, DetailedPublication, Product, Publication } from "@/types"
import emptyHeartSVG from "$/public/images/svg/empty-heart.svg"
import filledHeartSVG from "$/public/images/svg/filled-heart.svg"
import emptyFavoriteSVG from "$/public/images/svg/empty-favorite.svg"
import filledFavoriteSVG from "$/public/images/svg/filled-favorite.svg"
import arrowSVG from "$/public/images/svg/arrow.svg"
import watermark from "$/public/images/logo/watermark.png"
import optionsSVG from "$/public/images/svg/options.svg"
import shareSVG from "$/public/images/svg/share.svg"
import useWindowDimensions from "@/hooks/useWindowDimension"
import { useRouter } from "next/navigation"
import { fetchWrapper } from "@/lib/api/fetch"
import { RootState, useAppSelector } from "@/store/store"
import alert from "@/types/alert"
import Popover, { PopoverContent, PopoverTrigger } from "../utils/Popover"
import ItemModal from "./ItemModal"

interface FeedItemProps {
    item: Product | DetailedProduct | Publication | DetailedPublication
    infoArea: 'like' | 'favorite' | false
    itemSize?: (arg: number) => number
}

const isDetailed = (item: Product | DetailedProduct | Publication | DetailedPublication): item is DetailedProduct | DetailedPublication => {
    return 'id_dono_publicacao' in item;
}

const FeedItem: React.FC<FeedItemProps> = ({ item, infoArea, itemSize }) => {

    const [isLiked, setIsLiked] = useState<boolean>(Number(item.curtida) === 1)
    const [isFavorited, setIsFavorited] = useState<boolean>(Number(item.favorito) === 1)
    const [isOptionsOpen, setOptionsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const currentUser = useAppSelector((state: RootState) => state.user)
    const hasMultipleImages = Boolean(item.imagens.length > 1)
    const windowWidth = useWindowDimensions().width
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
    const baseHeight = infoArea ? 46 : 6
    const itemWidth = itemSize? itemSize(windowWidth as number) : (windowWidth as number - 32)/5
    console.log(itemWidth);
    
    
    const router = useRouter()

    const handleProductLike = async () => {

        setIsLiked(prev => !prev)

        const url = 'v1/aquarela/like/product'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_produto: item.id_publicacao,
                id_usuario: currentUser.id
            }),
        };
        const resp = await fetchWrapper(url, options)

        if (!resp) {
            setIsLiked(prev => !prev)
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
                id_produto: item.id_publicacao,
                id_usuario: currentUser.id
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

        setIsLiked(prev => !prev)

        const url = 'v1/aquarela/like/posts'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_postagem: item.id_publicacao,
                id_usuario: currentUser.id
            }),
        };
        const resp = await fetchWrapper(url, options)

        if (!resp) {
            setIsLiked(prev => !prev)
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
                id_postagem: item.id_publicacao,
                id_usuario: currentUser.id
            }),
        }

        const resp = await fetchWrapper(url, options)

        if (!resp) {
            setIsFavorited(isFavorited)
            return isFavorited
        }

        return newFavoritedState

    }

    useEffect(() => {
        if (isOptionsOpen) {
            setIsHovered(true)
        }
    }, [isOptionsOpen])

    const handleNextImage = () => {
    }

    const handlePrevImage = () => {
    }

    const handleShare = async () => {
        const path = item.tipo === 'postagem' ? 'publication' : 'product'
        await navigator.clipboard.writeText(`https://aquarela-front-end.vercel.app/home/${path}/${item.id_publicacao}`)
        alert({ icon: 'success', title: 'Copiado para área de transferência' })
    }

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const target = event.target as HTMLImageElement
        setImageDimensions({ width: target.naturalWidth, height: target.naturalHeight })
        setIsLoading(false)
    }

    const calculateGridRowEnd = () => {

        let height = baseHeight

        if (imageDimensions) {
            const { width: imgWidth, height: imgHeight } = imageDimensions;

            if (windowWidth as number > 768) {
                if (imgWidth === itemWidth) {
                    height = Math.max(baseHeight, imgHeight)
                } else {
                    height = Math.max(baseHeight, ((imgHeight * itemWidth) / imgWidth) + baseHeight);
                }
            } else {
                const divWidth = ((windowWidth as number - 4 * 16) / 2)
                height = Math.max(baseHeight, ((imgHeight * divWidth) / imgWidth) + baseHeight)
            }
        }
        return Math.ceil(height)
    }

    const handleItemClick = () => {
        item.tipo == 'postagem' ? router.push('/home/publication/' + item.id_publicacao) : router.push('/home/product/' + item.id_publicacao)
    }

    return (
        <>

            <div 
                className={`flex-col gap-2 p-2 h-fit ${isLoading? 'flex' : 'hidden'}`}
                style={{width: itemWidth+'px'}}
            >
                <div 
                    className="w-full bg-blue-6/70 animate-pulse rounded-xl"
                    style={{height: itemWidth+'px'}}
                />
                <div 
                    className="w-full bg-blue-6/70 animate-pulse rounded-xl"
                    style={{height: baseHeight+'px'}}
                />
            </div>

            <div
                className={`flex-col gap-2 p-2 cursor-pointer ${isLoading? 'hidden' : 'flex'}`}
                style={{
                    gridRowEnd: `span ${calculateGridRowEnd()}`,
                    minHeight: '2.5rem',
                }}
            >
                <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => {
                        if (!isOptionsOpen) setIsHovered(false);
                    }}
                >
                    <Image
                        alt={item.nome}
                        src={item.imagens[0].url}
                        priority
                        onLoad={handleImageLoad}
                        width={500}
                        height={500}
                        onClick={handleItemClick}
                        className="w-full h-auto object-cover shadow-feed-item rounded-xl"
                    />
                    {Boolean(Number(item.marca_dagua)) && (
                        <div
                            className={`overflow-hidden rounded-xl absolute inset-0 pointer-events-none`}
                        >
                            <div
                                className="absolute bg-cover inset-0  w-[165%] h-[165%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12"
                                style={{
                                    backgroundImage: `url(${watermark.src})`
                                }}
                            />
                        </div>
                    )}
                    {isHovered && (
                        <div
                            className="hidden md:flex items-end overflow-hidden p-2 rounded-xl absolute inset-0 bg-black/40 pointer-events-none"
                        >
                            {hasMultipleImages && (
                                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between p-2 pointer-events-auto">
                                    <button
                                        onClick={handlePrevImage}
                                        className="bg-white rounded-full w-8 h-8 flex items-center justify-center"
                                    >
                                        <Image
                                            src={arrowSVG}
                                            alt="Imagem anterior"
                                            width={100}
                                            height={100}
                                            className="w-auto h-full -translate-x-[5%]"
                                        />
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="bg-white rounded-full w-8 h-8 flex items-center justify-center rotate-180"
                                    >
                                        <Image
                                            src={arrowSVG}
                                            alt="Imagem anterior"
                                            width={100}
                                            height={100}
                                            className="w-auto h-full -translate-x-[5%]"
                                        />
                                    </button>
                                </div>
                            )}
                            <div className="flex w-full justify-end gap-3 pointer-events-auto">
                                <button
                                    className="bg-white rounded-full w-8 h-8 flex items-center justify-center"
                                    onClick={handleShare}
                                >
                                    <Image
                                        alt="Compartilhar"
                                        src={shareSVG}
                                        width={100}
                                        height={100}
                                        className="w-[55%] h-auto"
                                    />
                                </button>
                                <Popover open={isOptionsOpen} onOpenChange={(open) => {
                                    setOptionsOpen(open);
                                    if (!open) {
                                        setIsHovered(false)
                                    }
                                }}>
                                    <PopoverTrigger asChild onClick={() => setOptionsOpen((v) => !v)}>
                                        <button
                                            className="bg-white rounded-full w-8 h-8 flex items-center justify-center"
                                        >
                                            <Image
                                                alt="Opções"
                                                src={optionsSVG}
                                                width={100}
                                                height={100}
                                                className="w-[55%] h-auto"
                                            />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <ItemModal
                                            item={item}
                                            onFavorite={item.tipo === 'produto' ? handleProductFavorite : handlePublicationFavorite}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    )}
                </div>
                {infoArea && isDetailed(item) && (
                    <div className="flex justify-between items-center">
                        {item.tipo == 'produto' ? (
                            <>
                                <Avatar
                                    nickname={item.dono_publicacao.nome_usuario}
                                    user={item.dono_publicacao}
                                    className="w-8 h-8"
                                />
                                <h2 className="font-medium text-secondary-mobile md:text-base text-blue-1">{`R$: ${item.preco}`}</h2>
                                {infoArea == "like" ? (
                                    <button className="h-8 w-8" onClick={handleProductLike}>
                                        <Image
                                            alt='Curtida'
                                            src={isLiked == true ? filledHeartSVG : emptyHeartSVG}
                                        />
                                    </button>
                                ) : (
                                    <button className="h-8 w-8" onClick={handleProductFavorite}>
                                        <Image
                                            alt='Curtida'
                                            src={isFavorited == true ? filledFavoriteSVG : emptyFavoriteSVG}
                                        />
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-1">
                                    <Avatar
                                        nickname={item.dono_publicacao.nome_usuario}
                                        user={item.dono_publicacao}
                                        className="w-8 h-8"
                                    />
                                    <h2 className="font-medium text-secondary-mobile md:text-[14px] text-blue-1">{`@${item.dono_publicacao.nome_usuario}`}</h2>
                                </div>
                                {infoArea == 'like' ? (
                                    <button className="h-8 w-8" onClick={handlePublicationLike}>
                                        <Image
                                            alt='Curtida'
                                            src={isLiked == true ? filledHeartSVG : emptyHeartSVG}
                                        />
                                    </button>
                                ) : (
                                    <button className="h-8 w-8" onClick={handlePublicationFavorite}>
                                        <Image
                                            alt='Curtida'
                                            src={isFavorited == true ? filledFavoriteSVG : emptyFavoriteSVG}
                                        />
                                    </button>
                                )}
                            </>
                        )
                        }
                    </div>
                )}
            </div>

        </>
    )
}

export default FeedItem
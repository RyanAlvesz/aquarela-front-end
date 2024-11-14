'use client'

import Image from "next/image"
import Avatar from "../buttons/Avatar"
import React, { useState } from "react"
import { DetailedProduct, DetailedPublication, Product, Publication } from "@/types"
import emptyHeartSVG from "$/public/images/svg/empty-heart.svg"
import filledHeartSVG from "$/public/images/svg/filled-heart.svg"
import emptyFavoriteSVG from "$/public/images/svg/empty-favorite.svg"
import filledFavoriteSVG from "$/public/images/svg/filled-favorite.svg"
import useWindowDimensions from "@/hooks/useWindowDimension"
import { useRouter } from "next/navigation"

interface FeedItemProps {
    item: Product | DetailedProduct | Publication | DetailedPublication
    infoArea: 'like' | 'favorite' | false
}

const isDetailed = (item: Product | DetailedProduct | Publication | DetailedPublication): item is DetailedProduct | DetailedPublication => {
    return 'id_dono_publicacao' in item;
}

const FeedItem: React.FC<FeedItemProps> = ({ item, infoArea }) => {

    const [isLiked, setIsLiked] = useState<boolean>(item.curtida)
    const [isFavorited, setIsFavorited] = useState<boolean>(item.favorito)
        
    const router = useRouter()

    const handleProductLike = () => {
        setIsLiked(prevLiked => !prevLiked)
    }

    const handleProductFavorite = () => {
        setIsFavorited(prevFavorited => !prevFavorited)
    }

    const handlePublicationLike = () => {
        setIsLiked(prevLiked => !prevLiked)
    }

    const handlePublicationFavorite = () => {
        setIsFavorited(prevFavorited => !prevFavorited)
    }

    const windowWidth = useWindowDimensions().width

    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const target = event.target as HTMLImageElement
        setImageDimensions({ width: target.naturalWidth, height: target.naturalHeight })
    }

    const calculateGridRowEnd = () => {

        const baseHeight = infoArea? 64 : 24
        let height = baseHeight

        if (imageDimensions) {
            const { width: imgWidth, height: imgHeight } = imageDimensions;

            if (windowWidth as number > 768) {
                if (imgWidth === 188) {
                    height = Math.max(baseHeight, imgHeight)
                } else {
                    height = Math.max(baseHeight, ((imgHeight * 188) / imgWidth) + baseHeight);
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
        <div
            className={`flex flex-col gap-2 p-2 cursor-pointer`}
            style={{
                gridRowEnd: `span ${calculateGridRowEnd()}`,
                minHeight: '2.5rem',
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
                className="w-full h-auto object-cover shadow-feed-item rounded"
            />
            {infoArea && isDetailed(item) && (
                <div className="flex justify-between items-center">
                    {item.tipo == 'produto' ? (
                        <>
                            <Avatar
                                nickname={item.dono_publicacao.nome_usuario}
                                user={item.dono_publicacao}
                                className="w-8 h-8"
                            />
                            <h2 className="font-medium text-secondary-mobile md:text-[14px] text-blue-1">{`R$: ${item.preco}`}</h2>
                            {infoArea == "like"? (
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
                            {infoArea == 'like'? (
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
    )
}

export default FeedItem
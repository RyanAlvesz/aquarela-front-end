'use client'

import Image from "next/image"
import ProfileButton from "../buttons/ProfileButton"
import React, { useEffect, useState } from "react"
import { Product } from "@/types"
import emptyHeartSVG from "$/public/images/svg/empty-heart.svg"
import filledHeartSVG from "$/public/images/svg/filled-heart.svg"
import useWindowDimensions from "@/hooks/useWindowDimension"
import { useRouter } from "next/navigation"

interface feedProductProps {
    product: Product
}

const FeedProduct: React.FC<feedProductProps> = ({ product }) => {

    const [isLiked, setIsLiked] = useState(!product.curtida)
        
    const router = useRouter()

    useEffect(() => {
        setIsLiked(!product.curtida);
    }, [product.curtida]);

    const handleLike = () => {
        setIsLiked(prevLiked => !prevLiked)
    }

    const windowWidth = useWindowDimensions().width

    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const target = event.target as HTMLImageElement
        setImageDimensions({ width: target.naturalWidth, height: target.naturalHeight })
    }

    const calculateGridRowEnd = () => {

        const baseHeight = 40
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
        return Math.ceil(height / 22)
    }

    const handleClick = () => {
        router.push('/create/product')
    }

    return (
        <div
            className={`my-2 flex flex-col gap-2`}
            style={{
                gridRowEnd: `span ${calculateGridRowEnd()}`,
                minHeight: '2.5rem',
            }}
        >
            <Image
                alt={product.nome}
                src={product.imagens[0].url}
                priority
                onLoad={handleImageLoad}
                width={1000}
                height={1000}
                onClick={handleClick}
                className="w-full h-auto object-cover shadow-feed-item rounded"
            />
            <div className="flex justify-between items-center">
                <ProfileButton
                    id={product.id_dono_publicacao}
                    user={product.dono_publicacao}
                    className="w-8 h-8"
                />
                <h2 className="font-medium text-secondary-mobile text-blue-1">{`R$: ${product.preco}`}</h2>
                <button className="h-8 w-8" onClick={handleLike}>
                    <Image
                        alt='Curtida'
                        src={isLiked ? filledHeartSVG : emptyHeartSVG}
                    />
                </button>
            </div>
        </div>
    )
}

export default FeedProduct
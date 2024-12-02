import React from "react"
import { DetailedProduct, DetailedPublication } from "@/types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import SocialButtonArea from "./SocialButtonArea";

interface PublicationDetailsProps {
    publication: DetailedPublication | DetailedProduct
    likeImage: string | StaticImport
    favoriteImage: string | StaticImport
    like: () => void
    favorite: () => void
    share: () => void
}

const PublicationDetails: React.FC<PublicationDetailsProps> = ({publication, like, favorite, share, likeImage, favoriteImage}) => {
    return (
        <div className="grid items-info w-full items-center justify-between p-3 md:flex gap-1">
            <h1 className="font-medium text-base text-blue-1 md:hidden">{publication.nome}</h1>
            <span className="mt-3 md:hidden"> {publication.descricao} </span>
            <div className="hidden md:flex min-h-fit max-h-[10vh] overflow-y-scroll text-lg"> <span> <strong className="text-blue-1"> {publication.nome} </strong> {publication.descricao !== '' ? '-' : ''}  {publication.descricao} </span> </div>
            <SocialButtonArea
                classname="flex items-center justify-center gap-2 w-fit place-self-start justify-self-end md:hidden"
                favorite={favorite}
                favoriteImage={favoriteImage}
                like={like}
                likeImage={likeImage}
                share={share}
            />
        </div>
    )
}

export default PublicationDetails
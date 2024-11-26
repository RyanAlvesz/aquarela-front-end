import React from "react"
import SocialButton from "../buttons/SocialButton"
import shareSVG from "$/public/images/svg/share.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface SocialButtonAreaProps {
    likeImage: string | StaticImport
    favoriteImage: string | StaticImport
    like: () => void
    favorite: () => void
    share: () => void
    classname: string
}

const SocialButtonArea: React.FC<SocialButtonAreaProps> = ({favorite, favoriteImage, like, likeImage, share, classname}) => {
    return (
        <div className={`${classname}`}>
            <SocialButton action={like} alt={'Curtida'} src={likeImage} />
            <SocialButton action={favorite} alt={'Favorito'} src={favoriteImage} />
            <SocialButton action={share} alt={'Compartilhar'} src={shareSVG} className="ml-auto"/>
        </div>
    )
}

export default SocialButtonArea
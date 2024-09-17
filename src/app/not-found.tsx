import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Página não econtrada',
    description: "404",
};  

const notFound = () => {
    return(
        <div className="relative w-screen h-screen flex items-center justify-center bg-starry-night bg-cover bg-center bg-no-repeat">
            <main className="flex flex-col items-center justify-center w-full h-full text-center bg-black bg-opacity-70 text-white gap-4 md:gap-6 2xl:gap-24 p-6">
                <h1 className="italic font-medium text-title-mobile md:text-title-desktop 2xl:text-title-desktop-large">Por que estou aqui?</h1>
                <p className="text-body-mobile md:text-body-desktop 2xl:text-body-desktop-large">Parece que a página que você procura não existe mais</p>
                <Link href="/">
                    <button className="bg-white rounded-full ease-linear duration-100 hover:bg-blue-1 hover:[&>span]:text-white">
                        <span className="font-bold text-secondary-mobile md:text-secondary-desktop 2xl:text-secondary-desktop-large text-blue-1 uppercase py-3 px-6 md:px-8 md:py-4 2xl:px-24 2xl:py-16 flex ease-linear duration-100">Voltar ao museu</span>
                    </button>
                </Link>
            </main>
        </div>
    )
}

export default notFound;
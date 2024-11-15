'use client'

import { useEffect, useState } from "react"
import image1 from '$/public/images/paintings/landing/1.jpg'
import image2 from '$/public/images/paintings/landing/2.jpg'
import image3 from '$/public/images/paintings/landing/3.jpg'
import image4 from '$/public/images/paintings/landing/4.jpg'
import image5 from '$/public/images/paintings/landing/5.jpg'
import aquarela from '$/public/images/logo/aquarela-1.png'
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

const Home = () => {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0)

  const images: StaticImageData[] = [image1, image2, image3, image4, image5]

  const slogans: string[] = [
    "Pinte histórias, conecte pessoas.", 
    "Onde inspiração vira conexão.",     
    "Explore, inspire, conecte.",         
    "Sua arte, sua conexão.",            
    "Onde cada traço encontra seu público.", 
    "Transforme talentos em encontros criativos.", 
    "Compartilhe sua paixão com o mundo."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 30000)
    return () => clearInterval(interval)
  }, [images.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
    }, 5000)
    return () => clearInterval(interval)
  }, [slogans.length])

  return (
    <main
      className="h-screen bg-cover bg-center bg-no-repeat animate-fade ease-linear duration-700"
      style={{ backgroundImage: `url(${images[currentIndex].src})` }}
    >
      <div className="flex flex-col gap-[10vh] px-10 md:justify-center md:items-center py-8 bg-black/40 h-full w-full text-white">
        <div className="grow flex flex-col items-center justify-center gap-4 md:grow-0">
          <h1>
            <Image
              src={aquarela}
              alt="Aquarela"
              width={400}
              height={240}
              className="h-auto w-auto md:w-[35vw]"
            />
          </h1>
          <p className="font-medium text-xl md:text-3xl text-center h-[8.5vh] animate-fade ease-linear duration-700">
            {slogans[currentSloganIndex]}
          </p>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 w-full text-xl md:text-[1.65rem] md:w-[35vw]">
          <button className="flex items-center justify-center text-center h-[8.5vh] md:font-medium md:h-fit md:py-6 rounded-md md:rounded-lg bg-blue-1/80 hover:bg-blue-1 ease-linear duration-100">
            <Link href={'/authentication/register'} className="">Criar conta</Link>
          </button>
          <button className="flex items-center justify-center text-center h-[8.5vh] md:font-medium md:h-fit md:py-6 rounded-md md:rounded-lg bg-blue-2/80 hover:bg-blue-2 ease-linear duration-100">
            <Link href={'/authentication/login'} className="">Fazer login</Link>
          </button>
        </div>
      </div>
    </main>
  )
}

export default Home

'use client'

import { Product, Publication } from "@/types"
import FeedProduct from "./FeedProduct"
import FeedPublication from "./FeedPublication"

interface dinamicFeedProps {
  feed: (Publication | Product)[]
}

const DinamicFeed: React.FC<dinamicFeedProps> = ({ feed }) => {  

  return (

    <div className="h-fit grid bg-blue-7 md:bg-white px-4 pb-[12vh] grid-cols-[repeat(auto-fill,minmax(calc((100vw-4rem)/2),1fr))] md:grid-cols-[repeat(auto-fill,minmax(188px,1fr))] auto-rows-[1px] justify-center">
      {feed.map((item) => {
        if (item.tipo === 'produto') {
          return (
            <FeedProduct
              key={`product-${item.id_publicacao}`}
              product={item}
            />
          )
        } else if (item.tipo === 'postagem'){
          return (
            <FeedPublication
              key={`publication-${item.id_publicacao}`}
              publication={item}
            />
          )
        }
        return null
      })}
      {feed.map((item) => {
        if (item.tipo === 'produto') {
          return (
            <FeedProduct
              key={`product-${item.id_publicacao}`}
              product={item}
            />
          )
        } else if (item.tipo === 'postagem'){
          return (
            <FeedPublication
              key={`publication-${item.id_publicacao}`}
              publication={item}
            />
          )
        }
        return null
      })}
      {feed.map((item) => {
        if (item.tipo === 'produto') {
          return (
            <FeedProduct
              key={`product-${item.id_publicacao}`}
              product={item}
            />
          )
        } else if (item.tipo === 'postagem'){
          return (
            <FeedPublication
              key={`publication-${item.id_publicacao}`}
              publication={item}
            />
          )
        }
        return null
      })}
      {feed.map((item) => {
        if (item.tipo === 'produto') {
          return (
            <FeedProduct
              key={`product-${item.id_publicacao}`}
              product={item}
            />
          )
        } else if (item.tipo === 'postagem'){
          return (
            <FeedPublication
              key={`publication-${item.id_publicacao}`}
              publication={item}
            />
          )
        }
        return null
      })}
    </div>

  )
}

export default DinamicFeed





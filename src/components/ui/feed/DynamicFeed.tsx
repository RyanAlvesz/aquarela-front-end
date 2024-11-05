'use client'

import { Product, Publication } from "@/types"
import FeedItem from "./FeedItem"

interface DynamicFeedProps {
  feed: (Publication | Product)[]
  infoArea: boolean
}

const DynamicFeed: React.FC<DynamicFeedProps> = ({ feed, infoArea }) => {

  return (

    <div className="h-fit min-w-fit max-w-full grid bg-blue-7 md:bg-white px-4 pb-[12vh] grid-cols-[repeat(auto-fill,minmax(calc((100vw-4rem)/2),1fr))] md:grid-cols-[repeat(auto-fill,minmax(188px,1fr))] auto-rows-[1px]">
      {feed.map((item) => {
          return (
            <FeedItem
              key={`${item.tipo}-${item.id_publicacao}`}
              infoArea = {infoArea}
              item={item}
            />
          )
      })}
    </div>

  )
}

export default DynamicFeed





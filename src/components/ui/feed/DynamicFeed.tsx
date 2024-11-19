import { Product, Publication } from "@/types"
import FeedItem from "./FeedItem"

interface DynamicFeedProps {
  feed: (Publication | Product)[]
  infoArea: 'like' | 'favorite' | false
  className?: string
}

const DynamicFeed: React.FC<DynamicFeedProps> = ({ feed, infoArea, className }) => {

  const feedItemsWithImages = feed.filter(item => item.imagens && item.imagens.length > 0)

  return (
    <div className={"h-fit min-w-fit max-w-full grid bg-blue-7 md:bg-white px-4 pb-[12vh] grid-cols-[repeat(auto-fill,minmax(calc((100vw-4rem)/2),1fr))] md:grid-cols-[repeat(auto-fill,minmax(270px,1fr))] auto-rows-[1px] " + className}>
      {feedItemsWithImages.map((item) => {
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





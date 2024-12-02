import { Product, Publication, Folder as IFolder } from "@/types"
import FeedItem from "./FeedItem"

interface DynamicFeedProps {
  feed: (Publication | Product)[]
  infoArea: 'like' | 'favorite' | false
  className?: string
  itemSize?: (arg: number) => number
  deleteFolder?: IFolder
  deleteItem?: boolean
  refreshItems?: () => void
}

const DynamicFeed: React.FC<DynamicFeedProps> = ({ feed, infoArea, className, itemSize, deleteFolder, deleteItem, refreshItems }) => {

  const feedItemsWithImages = feed.filter(item => item.imagens && item.imagens.length > 0)

  return (
    <div className={"h-fit min-w-fit max-w-full grid bg-blue-7 md:bg-white px-4 pb-[12vh] grid-cols-[repeat(auto-fill,minmax(calc((100vw-4rem)/2),1fr))] md:grid-cols-[repeat(auto-fill,minmax(calc((100vw-2rem)/5),1fr))] auto-rows-[1px] " + className}>
      {feedItemsWithImages.map((item) => {
          return (
            <FeedItem
              key={`${item.tipo}-${item.id_publicacao}`}
              infoArea = {infoArea}
              item={item}
              itemSize={itemSize}
              deleteFolder={deleteFolder}
              refreshItems={refreshItems}
              deleteItem={deleteItem}
            />
          )
      })}
    </div>
  )
}

export default DynamicFeed





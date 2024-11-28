'use client'

import DynamicFeed from "@/components/ui/feed/DynamicFeed"
import MobileNavigation from "@/components/ui/navigation/MobileNavigation"
import LoadingMessage from "@/components/ui/utils/LoadingMessage"
import useWindowDimensions from "@/hooks/useWindowDimension"
import { fetchWrapper } from "@/lib/api/fetch"
import { RootState, useAppSelector } from "@/store/store"
import { Product, Publication } from "@/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface GetResp {
  resultado: (Publication | Product)[]
  quantity: number
  status_code: number
}

const Search = () => {

  const params = useParams()
  const currentUser = useAppSelector((state: RootState) => state.user)
  const [searchItems, setSearchItems] = useState<(Publication | Product)[]>([])
  const [search, setSearch] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [feedCollums, setFeedCollums] = useState(5)

  const windowWidth = useWindowDimensions()

  useEffect(() => {
    if (windowWidth.width as number >= 2560) {
      setFeedCollums(7)
    } else {
      setFeedCollums(5)
    }
  }, [windowWidth])

  useEffect(() => {
    setSearch(decodeURIComponent(String(params.q)))
  }, [params])

  const fetchSearch = async () => {

    const url = `v1/aquarela/search/?client=${currentUser.id}&search=${search}`

    const options: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    }

    const resp = await fetchWrapper<GetResp>(url, options)
    if (resp.status_code == 200) {
      setSearchItems(resp.resultado)
      console.log(resp.resultado)
    }
    setIsLoading(false);

  }

  useEffect(() => {
    fetchSearch()
  }, [search])

  return (
    <main className="h-full relative flex flex-col grow bg-blue-7 md:bg-white pt-5 md:pt-0 gap-3 md:gap-2">
      <MobileNavigation />
      {isLoading ? (
        <LoadingMessage message="Buscando suas artes" />
      ) : searchItems?.length === 0 ? (
        <div className="flex items-center justify-center text-base md:text-xl text-center font-medium text-blue-1 p-6">
          Nenhuma arte encontrada.
        </div>
      ) : (
        <DynamicFeed
          feed={searchItems}
          infoArea="like"
          className="2xl:!grid-cols-[repeat(auto-fill,minmax(calc((100vw-2rem)/7),1fr))]"
          itemSize={(vw) => (vw / feedCollums)}
        />
      )}
    </main>
  )
}

export default Search

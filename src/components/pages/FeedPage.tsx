'use client'

import DynamicFeed from "@/components/ui/feed/DynamicFeed";
import MobileNavigation from "@/components/ui/navigation/MobileNavigation";
import MobileSearchArea from "@/components/ui/navigation/MobileSearchArea";
import { fetchWrapper } from "@/lib/api/fetch";
import { Product, Publication } from "@/types";
import { RootState, useAppSelector } from "@/store/store";
import React, { useEffect, useState } from "react";
import LoadingMessage from "../ui/utils/LoadingMessage";

interface GetResp {
  feed: (Publication | Product)[]
}

const FeedPage = () => {

  const [feedItems, setFeedItems] = useState<(Publication | Product)[]>([]);
  const user = useAppSelector((state: RootState) => state.user)
  const [isLoading, setIsLoading] = useState(true);

  const url = 'v1/aquarela/feed/' + (user.id? user.id : 1)

  useEffect(() => {

    const options: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    }

    const fetchFeedItems = async () => {
      const resp = await fetchWrapper<GetResp>(url, options)
      setFeedItems(resp.feed || [])
      setIsLoading(false);
    }
    fetchFeedItems()
    
  }, [user.id, url])


  return (
    <>
      <main className="h-full relative flex flex-col grow bg-blue-7 md:bg-white pt-5 md:pt-0 gap-3 md:gap-2">
        <MobileSearchArea />
        {isLoading ? (
            <LoadingMessage message="Estamos preparando tudo para você!" />
        ) : (
            <DynamicFeed feed={feedItems} infoArea="like"/>
        )}
      </main>
      <MobileNavigation />
    </>
  );
}

export default FeedPage

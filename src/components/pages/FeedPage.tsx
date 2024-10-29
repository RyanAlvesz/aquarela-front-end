'use client'

import DinamicFeed from "@/components/ui/feed/DinamicFeed";
import MobileNavigation from "@/components/ui/navigation/MobileNavigation";
import MobileSearchArea from "@/components/ui/navigation/MobileSearchArea";
import { fetchWrapper } from "@/lib/api/fetch";
import { Product, Publication } from "@/types";
import { RootState, useAppSelector } from "@/store/store";
import React, { useEffect, useState } from "react";

interface GetResp {
  feed: (Publication | Product)[]
}

const FeedPage = () => {

  const [feedItems, setFeedItems] = useState<(Publication | Product)[]>([]);
  const user = useAppSelector((state: RootState) => state.user)

  const url = 'v1/aquarela/feed/' + user.id

  const options: RequestInit = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-cache',
  }

  useEffect(() => {
    const fetchFeedItems = async () => {
      const resp = await fetchWrapper<GetResp>(url, options)
      setFeedItems(resp.feed || [])
    }
    fetchFeedItems()
  }, [user.id])

  return (
    <>
      <main className="h-full flex flex-col bg-blue-7 md:bg-white pt-5 md:pt-0 gap-3 md:gap-2">
        <MobileSearchArea />
        <DinamicFeed feed={feedItems} />
      </main>
      <MobileNavigation />
    </>
  );
}

export default FeedPage

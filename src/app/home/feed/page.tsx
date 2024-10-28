import FeedPage from "@/components/pages/FeedPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Início',
  description: "Página inicial",
}

const Feed = () => {  
  return(
    <FeedPage />
  )
}

export default Feed

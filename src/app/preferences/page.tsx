import { Metadata } from 'next'
import Preferences from '@/components/pages/Preferences';
import { Category } from '@/types';
import { fetchWrapper } from '@/lib/api/fetch';

export const metadata: Metadata = {
  title: 'Preferências',
  description: "Escolha de preferências",
}

export default async function Home() {

  const url = 'v1/aquarela/categories'
  const options: RequestInit = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    cache: 'no-cache'
  }

  interface getResp {
      categorias: Category[]
  } 

  const fetchCategories = async() => {
      const resp = await fetchWrapper<getResp>(url, options)   
      return resp.categorias
  }
   
  const categories = await fetchCategories()

  return (
        <Preferences categories={categories}/>
    );

}
  
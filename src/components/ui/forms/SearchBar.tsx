'use client'

import Image from "next/image"

import filterSVG from "$/public/images/svg/filter.svg"
import searchSVG from "$/public/images/svg/search.svg"
import { usePathname, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { setQuery } from "@/store/searchSlice"
import { useEffect, useState } from "react"
import Popover, { PopoverContent, PopoverTrigger } from "../utils/Popover"
import FilterPopover from "../utils/FilterPopover"

const SearchBar = () => {

    const dispatch = useAppDispatch()
    const query = useAppSelector((state) => state.search.query)
    const router = useRouter()
    const pathname = usePathname()
    const [searchArea, setSearchArea] = useState<boolean>(false)

    useEffect(()=>{
        setSearchArea(pathname.includes('/home/search'))
    },[pathname])
    
    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault()
        if(query.trim()){
            router.push(`/home/search/${encodeURIComponent(query)}`)
        }
    }

    return(
        <form onSubmit={handleSearch} className="flex items-center gap-2 md:gap-4 bg-blue-5/50 rounded-md md:rounded-lg justify-center h-[6vh] md:h-full w-full py-1 px-2 md:py-2 hover:bg-blue-5/80 md:dark:bg-blue-6 ease-linear duration-100">
            {searchArea && (
                <Popover placement="bottom-start">
                    <PopoverTrigger asChild>
                        <div className="h-full cursor-pointer">
                            <Image
                                alt="Filtro"
                                src={filterSVG}
                                className="h-full w-fit"
                            />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <FilterPopover />
                    </PopoverContent>
                </Popover>
            )}
            <input 
                type="text"
                placeholder="Pesquisar..."
                value={query}
                onChange={(e) => {dispatch(setQuery(e.target.value))}}
                className="grow h-full bg-transparent text-blue-2 placeholder:text-blue-2 md:placeholder:text-lg md:text-lg"
            />
            <button className="h-full" onClick={handleSearch}>
                <Image
                    alt="Lupa de busca"
                    src={searchSVG}
                    className="h-full w-fit"
                />
            </button>
        </form>
    )
}

export default SearchBar
import { DetailedProduct } from "@/types"
import Image from "next/image"
import React from "react"
import shopCartSVG from '$/public/images/svg/shop-cart.svg'

interface BuyAreaProps {
    product: DetailedProduct
}

const handleBuy = () => {

}

const handleAddCart = () => {

}

const BuyArea: React.FC<BuyAreaProps> = ({ product }) => {
    return (
        <div className="flex w-full items-center justify-between p-3 pb-5">
            <div className="flex gap-2 text-lg md:text-2xl text-blue-1 font-medium items-center justify-center">
                <h3> R$ {String(product.preco).replace('.',',')}</h3>
                <div className="w-1 h-1 bg-blue-1 rounded-full"></div>
                <h3> {product.quantidade} {product.quantidade == 1 ? 'unidade' : 'unidades'} </h3>
            </div>
            <div className="flex items-center justify-center gap-2 md:gap-4">
                <button 
                    onClick={handleAddCart}
                    className="w-10 h-10 flex items-center justify-center p-2 bg-blue-3 rounded-full"
                >
                    <Image
                        src={shopCartSVG}
                        alt="Carrinho"
                        width={100}
                        height={100}
                        className="w-full h-full"
                    />
                </button>
                <button 
                    onClick={handleBuy}
                    className="bg-blue-2 text-white px-5 h-10 rounded-lg font-medium md:text-xl"
                >
                    Comprar
                </button>
            </div>
        </div>
    )
}

export default BuyArea
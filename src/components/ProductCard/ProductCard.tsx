import Image from 'next/image'
import React from 'react'
import AddToCart from '../AddToCart/AddToCart'

const ProductCardComponent = ({ item }: any) => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-red-500 p-6 rounded-lg shadow-md">
            <div className="relative">
                <Image src={item.image} width={300} height={200} alt="Product Image" className="w-full h-64 rounded-lg" />
                <div className="absolute top-2 left-2 bg-white text-gray-700 rounded-full p-2">
                    <i className="fas fa-heart text-red-500"></i>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-2xl font-semibold text-white">{item.name}</h3>
                <p className="text-gray-200 mt-2">{item.description}</p>
                <div className="mt-4">
                    <span className="text-white text-2xl font-bold">{item.price}</span>
                    <AddToCart {...item} />
                </div>
            </div>
        </div>
    )
}

export default ProductCardComponent
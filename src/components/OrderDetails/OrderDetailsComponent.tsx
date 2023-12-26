'use client'
import Image from 'next/image'
import React from 'react'

const OrderDetailsComponent = (item: any) => {
    return (
        <div className='grid m-4'>
            <div className='border-solid border-2'>
                <div className='h-10 border-b-2 border-solid p-2 font-bold'>
                    Order Details
                </div>
                <div className='p-4'>
                    <div className='grid grid-cols-3 items-center'>
                        <Image src={item.image} width={80} height={40} alt="Cart Image" />
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsComponent
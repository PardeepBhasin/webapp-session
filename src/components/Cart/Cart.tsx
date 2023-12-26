'use client';
import useStore from '@/lib/store/store';
import React, { useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

// TODO -  Call Token Verification api to verify the session
// save userid in database when add to cart operation performs and pull the cart according the user id
const CartComponent = () => {
    const setCartDetails = useStore((state: any) => state.setCartDetails);
    const cartDetails = useStore((state: any) => state.cartDetails);
    const ref = useRef<boolean>(false);

    useEffect(() => {
        const fetchCart = async () => {
            ref.current = true;
            const response = await fetch('http://localhost:3000/api/fetchCart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            if (data) {
                setCartDetails(data);
            }
        }
        if (!ref.current) {
            fetchCart();
        }
    }, [])
    return (
        <div className='relative cursor-pointer'>
            <Link href='viewCart' passHref><ShoppingCart /></Link>
            {cartDetails && cartDetails.length > 0 &&
                <div className='bg-gradient-to-t from-purple-500 from bg-red-500 rounded-full text-white p-1 absolute'>{cartDetails.length}</div>
            }
        </div>
    )
}

export default CartComponent;
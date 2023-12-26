'use client'
import useStore from '@/lib/store/store';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm';

// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
function ViewCartComponent() {
    const ref = useRef<boolean>(false);
    const [cartData, setCartData] = useState<any>([]);
    const cartDetails = useStore((state: any) => state.cartDetails);
    const [clientSecret, setClientSecret] = React.useState("");
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
            setCartData(data);
        }
        if (!ref.current) {
            fetchCart();
        }
    }, [])
    useEffect(() => {
        if (cartDetails) {
            // Create PaymentIntent as soon as the page loads
            fetch('http://localhost:3000/api/createPaymentIntent', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cartDetails),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("clientSecret++++++++++++", clientSecret);
                    setClientSecret(data.clientSecret)
                    return;
                });
        }
    }, [cartDetails])
    return (
        <div className='grid grid-cols-2 gap-4 m-4'>
            <div className='border-solid border-2'>
                <div className='h-10 border-b-2 border-solid p-2 font-bold'>
                    Cart Details
                </div>
                <div className='p-4'>
                    {
                        cartData && cartData.map((item: any) => {
                            return (
                                <div className='grid grid-cols-3'>
                                    <Image src={item.image} width={80} height={40} alt="Cart Image" />
                                    <div>{item.name}</div>
                                    <div>{item.price}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                {clientSecret && (
                    <Elements options={{ clientSecret }} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </div>
    )
}

export default ViewCartComponent
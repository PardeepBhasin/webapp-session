'use client'
import React, { useEffect, useState } from 'react';
import { cartSchemaValidator } from "@/lib/model/schemaValidators";
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import { PlusIcon } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStore from '@/lib/store/store';

const AddToCart = (item: z.infer<typeof cartSchemaValidator>) => {
    const { data: session } = useSession();
    const setCartDetails = useStore((state: any) => state.setCartDetails);
    const [loader, setLoader] = useState<boolean>(false);
    const addItemToCart = async () => {
        if (!session || !session.user) {
            return toast.error('Please login first to add the items in cart.');
        }
        const token = session?.user.accessToken;
        setLoader(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/saveCart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(item)
        })
        const data = response.json();
        setCartDetails([item]);
        setLoader(false);
        return data;
    }
    return (
        <>
            {
                !loader ? <button onClick={addItemToCart} className='bg-yellow-500 text-purple-500 hover:bg-purple-500 hover:text-white px-4 py-2  float-right'><PlusIcon /></button> :
                    <div className='border-8 rounded-3xl h-10 w-10 animate-spin border-cyan-50 border-t-cyan-500 border-solid inline-block  float-right'></div>
            }
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default AddToCart
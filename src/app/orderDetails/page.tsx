import OrderDetailsComponent from '@/components/OrderDetails/OrderDetailsComponent';
import { getServerSession } from 'next-auth';
import React from 'react'

const fetchOrderDetails = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orderDetails`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json();
    console.log('fetchOrderDetails', data);
    return data;
}
const OrderDetails = async () => {
    const session = await getServerSession();
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }

    }
    const data = await fetchOrderDetails();
    console.log('fetchOrderDetails called', data);
    return (
        <div>
            {
                data && data.map((item: any) => {
                    return <OrderDetailsComponent key={Math.random()} {...item} />
                })
            }
        </div>
    )
}

export default OrderDetails;
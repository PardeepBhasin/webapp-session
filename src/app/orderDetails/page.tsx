import OrderDetailsComponent from '@/components/OrderDetails/OrderDetailsComponent';
import React from 'react'

const fetchOrderDetails = async () => {
    const response = await fetch('http://localhost:3000/api/orderDetails', {
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
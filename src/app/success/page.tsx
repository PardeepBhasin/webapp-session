import Link from 'next/link';
import React from 'react'

function SuccessComponent() {
    return (
        <div className='flex items-center justify-center h-screen'>
            <Link href='orderDetails'>
                <button className='bg-gradient-to-t from-purple-500 to-red-400 text-white p-4'>
                    View Order Details
                </button>
            </Link>
        </div>
    )
}

export default SuccessComponent;
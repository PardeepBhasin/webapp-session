const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { productSchemaValidator } from '@/lib/model/schemaValidators';
import { NextResponse } from 'next/server';
import { z } from 'zod';
const calculateOrderAmount = (items: z.infer<typeof productSchemaValidator>) => {
    const data = items.reduce((accum, item) => accum + item.price, 0);
    return Math.floor(data * 100);
}

const transformData = (items: z.infer<typeof productSchemaValidator>) => {
    let cartItems = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        cartItems.push({
            id: item.id
        })
    }
    return JSON.stringify(cartItems);
}
export async function POST(req: Request, res: Response) {
    const items = await req.json();
    const filteredData = transformData(items);
    console.log("updatedData+++++++++++", filteredData);
    // Create a PaymentIntent with the order amount and currency
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "inr",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                cartItems: filteredData
            }
        });
        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        }, {
            status: 400
        })
    } catch (error) {
        console.log("paymentIntent error+++++++++++", error);
        return NextResponse.json(error, {
            status: 400
        })
    }
}
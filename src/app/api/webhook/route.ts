import cartModel from "@/lib/model/cart";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = 'whsec_CxI6WFh56sdaScxZz0qHPf9FZPGgG4W3';
export async function POST(req: Request, res: Response) {
    const body = await req.text();
    let event;
    const headerList = headers();
    const signature = headerList.get('stripe-signature');
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            endpointSecret
        );
    } catch (error: any) {
        return NextResponse.json(`Webhook signature verification failed.${error.message}`, {
            status: 400
        })
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const data = event.data.object.charges.data[0].metadata;
            const cartData = JSON.parse(data.cartItems);
            console.log("data+++++++++++", cartData);
            let cartIds = [];
            for (let i = 0; i < cartData.length; i++) {
                cartIds.push(cartData[i].id);
            }
            console.log("cartIds+++++++++++", cartIds);
            try {
                const orderData = await cartModel.find({ id: { $in: cartIds } });
                console.log("orderData+++++++++++", orderData);
                if (orderData) {
                    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/saveOrderDetails`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(orderData)
                    })
                }
            } catch (error) {
                return NextResponse.json(error, {
                    status: 400
                })
            }
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`);
    }
    return NextResponse.json('success', {
        status: 200
    })
}
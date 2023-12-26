import React from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
    AddressElement
} from "@stripe/react-stripe-js";
import { AddressMode } from "@stripe/stripe-js";
import { Layout } from "@stripe/stripe-js";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: 'http://localhost:3000/success',
            },
        });
    };

    const paymentElementOptions = {
        layout: "tabs" as Layout,
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <AddressElement options={{
                mode: 'shipping' as AddressMode
            }} />
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button className="mt-4 bg-gradient-to-t from-purple-400 to-red-400 text-white p-4">Pay Now</button>
        </form>
    );
}
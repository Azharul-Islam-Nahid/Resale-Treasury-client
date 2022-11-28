import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../../Components/UseLoader/Loading';
import useTitle from '../../../hooks/UseTitle';
import CheckoutForm from './CheckoutForm';

const Payment = () => {

    useTitle('Payment')

    const stripePromise = loadStripe(process.env.REACT_APP_stripe_key);
    console.log("🚀 ~ file: Payment.js ~ line 11 ~ Payment ~ stripePromise", stripePromise)

    const orderDetails = useLoaderData();
    const navigation = useNavigation();

    if (navigation.state === "loading") {
        return <Loading></Loading>
    }

    console.log("🚀 ~ file: Payment.js ~ line 7 ~ Payment ~ orderDetails", orderDetails)
    return (
        <div>
            <h2 className="m-5 text-2xl font-bold">Make payment for {orderDetails?.product}</h2>
            <p className='text-2xl ml-5'>Please pay <span className='font-bold text-green-600'>{orderDetails?.price}</span> to purchase.</p>
            <div className='ml-5 w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        orderDetails={orderDetails}
                    ></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Payment = () => {

    // const product = {
    //     name: 'Dr Abc Singh',
    //     price: 500
    // }

    // const makePayment = (token) => {
    //     const body = {
    //         token,
    //         product
    //     }

    //     const headers = {
    //         "Content-Type": 'application/json'
    //     }

    //     return fetch('http://localhost:8282/payment', {
    //         method: 'POST',
    //         headers,
    //         body: JSON.stringify(body)
    //     }).then(response => {
    //         console.log("RESPONSE ", response);
    //         const { status } = response;
    //         console.log(status);
    //     }).catch(err => {
    //         console.log(err);
    //         const { status } = err;
    //         console.log(status);
    //     })

    // }

    // return (
    //     <div>
    //         <StripeCheckout stripeKey={stripe.(process.env.REACT_APP_KEY)} token={makePayment} name="Doctor consultation fees" />
    //     </div>
    // )
}

export default Payment;



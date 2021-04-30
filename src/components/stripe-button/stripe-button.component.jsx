import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    //Use your own stripe's API key otherwise it won't work
    const publishableKey = 'pk_test_51Im1dYHUuMj81ARrtmi1SM5Qq1J7asELW7Y3ebp9EgZo9stMTRzwh4gOSovNiqYHIg3eKjcwMwSTxV0SftuyIIzc00vekIEwKI';
    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='Crown Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
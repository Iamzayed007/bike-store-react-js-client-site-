import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
const CheckoutForm = (props) => {
    const {name, _id} = props.order;
    const {price} = props.item;
    const stripe = useStripe();
    const elements = useElements();
    // const {user}= useAuth()
    const history =useHistory()
const priceinfo= parseInt(price)

  const [error, setError]= useState('');
  const [success, setSuccess] =useState('')
  const [clientSecret, setClientSecret]=useState('')
  const [process, setprocess]=useState(false)


//   https://salty-scrubland-71202.herokuapp.com
    // http://localhost:5000
  useEffect(()=>{
    
    fetch('https://salty-scrubland-71202.herokuapp.com/create-payment-intent',{
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        
      },
      body: JSON.stringify({priceinfo})
    })
    .then(res=>res.json())
    .then(data=>{
       
        setClientSecret(data.clientSecret)
      });
  },[priceinfo])



    const handleSubmit = async (e) =>{
      e.preventDefault()
        if (!stripe || !elements) {
  
            return;
          }
          const card = elements.getElement(CardElement);
          
          if (card == null) {
            return;
          }
          setprocess(true)
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
      
          if (error) {
            // console.log('[error]', error);
            setError(error.message)
            
          } else {
            setError('')
        
            console.log('[PaymentMethod]', paymentMethod);
          }
         
      // payment intent 

      const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name:name ,
              // email: user.email 
            },
          },
        },
      );
        if(intentError){
          setSuccess('')
          setError(intentError.message)
        }  
        else{
          setError('');
          setSuccess('your payment processed succesfully')
          setprocess(false);

          // save to db 


          const payment= {
            amount : paymentIntent.amount,
            created: paymentIntent.created,
            last4: paymentMethod.card.last4,
            transaction: paymentIntent.client_secret.slice('_secret')[0]
          }
          const url = `https://salty-scrubland-71202.herokuapp.com/purchase/${_id}`;
          fetch(url, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(payment)
          
          })
          .then(res=>res.json())
          // .then(data=>{
          //   alert('Payment Successful')
          //   history.push('/')
          // })
        }

      
    }


   
    return (
        <div>
             <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
    { process  ?  <Spinner animation="grow" /> :<button type="submit" disabled={!stripe || success}>
        Pay {price}
      </button>}
    </form>

    {
      error && <p>{error}</p>
    }
    {
      success && <p>{success}</p>
    }
        </div>
    );
};

export default CheckoutForm;
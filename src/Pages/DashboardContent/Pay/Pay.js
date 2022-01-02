import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';


const stripeLoad = loadStripe('pk_test_51KDNG7KNcg3CRf96aTnEi8NA93eL5IcnOWnOoJwMAMRHiwB4V6CPBHqoK08iPp46ZufxHZO34SvaNd3nHZ4VSnae00xyZaPm1D')

// STRIPE=pk_test_51K073dH9Kuv7UeNyycym0fwuYdUHloSde7mO48UY49sDivKoicG5NHPWU674Gg79oUB87gNesOUeUDP1NqE5qmEU00CMIjMzgp

const Pay = () => {
const {OId}=useParams();
const [order,setOrder]=useState({})
const [item,setItem]=useState({})

      
    useEffect(() => {
        //  setLoading(true)
        fetch(`https://salty-scrubland-71202.herokuapp.com/purchase/${OId}`)
            .then(res => res.json())
            .then(data => {
              
              setItem(data.purchase)
                setOrder(data)
                
            })
           
    }, [])

    

    return (

        <div>
        <div className="text-center my-5">

            <h1>Payment for {item.name}</h1>

            

        </div>
        <div className="text-center my-5">
        <Elements stripe={stripeLoad}>
            <CheckoutForm 
            order={order}
            item={item}
            
            />
            </Elements>
        </div>


    </div>
    );
};

export default Pay;
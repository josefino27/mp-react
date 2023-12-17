import React from 'react'
import './Product.css'
import axios from 'axios'
import { useState } from 'react'

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'




const Product = () => {

    const [preferenceId, setPreferenceId] = useState(null);
    initMercadoPago('YOUR_PUBLIC_KEY', {
        locale: 'es-CO',
    });

    const createPreference = async () => {
        try {
            const resp = await axios.post('http://localhost:3000/create_preference',{
                title: 'firma de jose david',
                quantity: 1,
                price: 100
            });
            const {id} = resp.data;
            return id;
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleBuy = async () =>{
        const id = await createPreference();
        if(id)
        {
            setPreferenceId(id);
        }
    };

    return (
        <div className='card-product-container'>
            <div className='card-product'>
                <div className='card'>
                    <img
                        alt='Imagen del producto'
                        src='http://res.cloudinary.com/dmavnr0cu/image/upload/v1697928963/w3a1tisopk6nn5imblt4.png'
                  npm   />
                    <h5>
                        firma de jose david
                    </h5>
                    <p className="price">$ 100</p>
                    <button onClick={handleBuy}>comprar</button>
                    { preferenceId &&
                      <Wallet initialization={{ preferenceId:preferenceId}} />
                    }

                </div>
            </div>
        </div>
    )
}

export default Product
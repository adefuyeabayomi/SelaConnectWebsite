import { useEffect, useState } from 'react'
import {  useSearchParams } from "react-router-dom";

import './App.css'

export interface deliveryOrder {
    packageDescription: string;
    packageWeight?: number;
    perishables: boolean;
    fragile: boolean;
    pickupIsResidential: boolean;
    dropoffIsRedential: boolean;
    pickupRestrictions?:string;
    dropoffRestrictions?:string;
    senderName: string;
    senderPhoneNo: string;
    receiverName: string;
    receiverPhoneNo: string;
    pickupAddress: string;
    dropoffAddress: string;
    pickupLga: string;
    dropoffLga: string;
    paymentMethod: 'online' | 'ondelivery' | 'onpickup';
    totalDistance: number;
    user: string | undefined;
    deliveryId:string;
}
import { getDeliveryById } from './firestore';


export function Pay():React.JSX.Element {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('delivery'); 
  const [order,setOrder] = useState<deliveryOrder | null>()

  function getDelivery(){
    console.log('getting delivery')
    if(orderId){
        getDeliveryById(orderId).then(res=>{
            console.log('res', res)
        })
    }
    
  }
  useEffect(()=>{
    getDelivery()
  }, [])
  const payWithMonnify = async () => {
    let monnify = window.MonnifySDK
    monnify.initialize({
        amount: 10000,
        currency: "NGN",
        reference: orderId,
        customerFullName: 'Abayomi Adefuye',
        customerEmail: 'adefuyeabayomi16@gmail.com',
        apiKey: "MK_TEST_QA372KPS4C",
        contractCode: "5878350992",
        paymentDescription: `Payment for ${'Delivery Services'}`,
        onLoadStart: () => {
            console.log("loading has started");
        },
        onLoadComplete:() => {
            console.log("SDK is UP");
        },
        onComplete: function(response: any) {
          // Handle payment completion
          console.log({ response });
          if (response.status === 'SUCCESS') {
            console.log('Payment was successful');
            // Redirect back to your app
            window.location.href = `selaconnect://confirmpayment/${orderId}`;
          } else {
            console.log('Payment was unsuccessful');
          }
        },
        onClose: function(data: any) {
            //Implement what should happen when the modal is closed here
            console.log('do nothing', data);
        }
    });
}
    return (
        <div>
            <button onClick={payWithMonnify}>Pay For Delivery</button>
        </div>
    )
}
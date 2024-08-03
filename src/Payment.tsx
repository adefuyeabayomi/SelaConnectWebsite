import { useEffect } from 'react'
import {  useSearchParams } from "react-router-dom";
import './App.css'

export function Pay():React.JSX.Element {
  const [searchParams] = useSearchParams();
  const delivery = searchParams.get('delivery');

  const payWithMonnify = async () => {
    let monnify = window.MonnifySDK
    monnify.initialize({
        amount: 10000,
        currency: "NGN",
        reference: delivery,
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
            window.location.href = `selaconnect://confirmpayment/${delivery}`;
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
useEffect(()=>{
    setTimeout(()=>{
         payWithMonnify()
    },4000)
},[])
    return (
        <div>
            <button onClick={payWithMonnify}>Pay For Delivery</button>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { D_TextInput } from "../../components/input";
import { ButtonMain } from "../../components/button";
import { useLoading } from "../../contexts/LoadingContext";
import deliveryOrder, { DeliveryOrder } from "../../service/deliveryOrder";
import DModal from "../../components/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function PaymentPage(): React.JSX.Element {
  const [amount, setAmount] = useState<string>("");
  const [searchParams] = useSearchParams();
  const deliveryId = searchParams.get("deliveryId");
  const [isOpen,setIsOpen] = useState(false)
  let [modalTitle,setModalTitle] = useState('')
  let [modalBody,setModalBody] = useState('')
  let [tryAgain,setTryAgain] = useState(false)
  let [deliveryInput,setDeliveryInput] = useState('')

  const toggleModal = () => setIsOpen((val) => !val)
  const { setLoading, setLoadingText } = useLoading();
  
  const payWithMonnify = async (amount: number) => {
    let monnify = window.MonnifySDK
    setTryAgain(false)
    monnify.initialize({
        amount,
        currency: "NGN",
        reference: deliveryId,
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
            setLoading(false)
            setModalTitle("Payment Successful")
            setModalBody("Dear Customer, Your payment has been recieved. Check back in the app to track your package. Thank you for using Sela Connect Logistics.")
            // Redirect back to your app
            window.location.href = `selaconnect://confirmpayment/${deliveryId}`;
          } else {
            console.log('Payment was unsuccessful');
            setLoading(false)
            setModalTitle("Payment Unsuccessful")
            setModalBody("Dear Customer, Your payment was unsuccessful. Please try again.")
            setTryAgain(true)
          }
        },
        onClose: function(data: any) {
            //Implement what should happen when the modal is closed here
            console.log('do nothing', data);
        }
    });
}
  const handlePayment = async () => {
    if(!deliveryId && !deliveryInput){
      setModalTitle("Input Required")
      setModalBody("Please input the delivery id you want to pay for.")
      return;
    }
    let deliveryData: DeliveryOrder = await deliveryOrder.getDeliveryOrderById(deliveryId as string || deliveryInput)
    payWithMonnify(deliveryData.price as number)
  };

  useEffect(()=>{
    handlePayment()
  },[])
  if(tryAgain){
    return (
      <div className="payment-page p-3 py-5">
        <div>
          <h5>Try The Payment Again <FontAwesomeIcon icon={faCheck}/></h5>
        </div>
        <div className="col-12 col-sm-8 col-md-6">
          <div>
            <ButtonMain><span className="py-1">Try Again</span></ButtonMain>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="payment-page p-3">
      <DModal isOpen={isOpen} onClose={toggleModal}>
        <div className="py-2">
            <div>
              <h3>{modalTitle}</h3>
            </div>
            <div className="py-1" />
            <div>
              <h3>{modalBody}</h3>
            </div>
        </div>
      </DModal>
      <div className="py-4" />
      <h3 className="text-center">Payment</h3>
      <div className="py-4" />
      {!deliveryId && (
        <>
        <label>Enter Delivery Id</label>
          <D_TextInput
            type="text"
            placeholder="Enter Amount"
            value={deliveryInput}
            onChange={setDeliveryInput}
            dark={false}
          />
          <div className="py-2" />
        </>
      )}
      <div onClick={handlePayment}>
        <ButtonMain actionFn={handlePayment} style={{ marginTop: "20px" }}>
          {deliveryId ? "Pay Now" : "Proceed to Pay"}
        </ButtonMain>
      </div>
      <div className="py-4" />
    </div>
  );
}

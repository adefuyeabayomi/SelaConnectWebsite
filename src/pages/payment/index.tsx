import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { D_TextInput } from "../../components/input";
import { ButtonMain } from "../../components/button";
import { useLoading } from "../../contexts/LoadingContext";
import deliveryOrder from "../../service/deliveryOrder";
import DModal from "../../components/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function PaymentPage(): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const deliveryId = searchParams.get("deliveryId");
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [tryAgain, setTryAgain] = useState(false);
  const [deliveryInput, setDeliveryInput] = useState("");

  const { setLoading, setLoadingText } = useLoading();

  const toggleModal = () => setIsOpen((val) => !val);

  const payWithMonnify = async (amount: number, email: string) => {
    let monnify = window.MonnifySDK;
    setTryAgain(false);
    monnify.initialize({
      amount,
      currency: "NGN",
      reference: deliveryId,
      customerFullName: email.split("@")[0],
      customerEmail: email,
      apiKey: "MK_TEST_QA372KPS4C",
      contractCode: "5878350992",
      paymentDescription: `Payment for Delivery Services`,
      onLoadStart: () => console.log("loading has started"),
      onLoadComplete: () => console.log("SDK is UP"),
      onComplete: (response: any) => {
        setLoading(false);
        if (response.status === "SUCCESS") {
          console.log("Payment was successful");
          setModalTitle("Payment Successful");
          setModalBody(
            "Dear Customer, Your payment has been received. Check back in the app to track your package. Thank you for using Sela Connect Logistics."
          );
          window.location.href = `selaconnect://confirmpayment/${deliveryId}`;
        } else {
          console.log("Payment was unsuccessful");
          setModalTitle("Payment Unsuccessful");
          setModalBody("Dear Customer, Your payment was unsuccessful. Please try again.");
          setTryAgain(true);
        }
        setIsOpen(true)
      },
      onClose: (data: any) => console.log("Payment modal closed", data),
    });
  };

  const handlePayment = async () => {
    if (!deliveryId && !deliveryInput) {
      setModalTitle("Input Required");
      setModalBody("Please input the delivery ID you want to pay for.");
      setIsOpen(true)
      return;
    }

    setLoadingText("Processing Payment...");
    setLoading(true);

    try {
      const response = await deliveryOrder.getDeliveryOrderById(
        deliveryId || deliveryInput
      );
      console.log({ response });
      payWithMonnify(response.price, response.email);
    } catch (err: any) {
      setTryAgain(true);
      setModalTitle("An Error Occurred");
      setModalBody(`Reason: ${err.message}`);
      setIsOpen(true)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePayment();
  }, []);

  return (
    <div className="container-fluid no-space">
      <div className="row no-space justify-content-center">
      {!tryAgain ? (
        <div className="payment-page p-3 col-12 col-sm-10 col-md-7">
          <DModal isOpen={isOpen} onClose={toggleModal}>
            <div className="py-2">
              <h3>{modalTitle}</h3>
              <div className="py-1" />
              <p>{modalBody}</p>
            </div>
          </DModal>
          <div className="py-4" />
          <h1 className="text-center">Payment</h1>
          <div className="py-4" />
          {!deliveryId && (
            <>
              <label>Enter Delivery ID</label>
              <D_TextInput
                type="text"
                placeholder="Enter Delivery ID"
                value={deliveryInput}
                onChange={setDeliveryInput}
                dark={false}
              />
              <div className="py-2" />
            </>
          )}
          <div onClick={handlePayment}>
            <ButtonMain actionFn={handlePayment} style={{ marginTop: "20px" }}>
              <span className="py-1 d-inline-block">
                {deliveryId ? "Pay Now" : "Proceed to Pay"}
              </span>
            </ButtonMain>
          </div>
          <div className="py-4" />
        </div>


      ) : null}
      {tryAgain ? (
        <div className="payment-page p-3 py-5">
          <div>
          <div className="py-4" />
            <h5 className="text-center">
              Try The Payment Again <FontAwesomeIcon icon={faCheck} />
            </h5>
          </div>
          <div className="col-12 no-space">
            <div onClick={handlePayment}>
              <ButtonMain>
                <span className="py-1 d-inline-block">Try Again</span>
              </ButtonMain>
            </div>
          </div>
        </div>
      ): null}
    </div>
      </div>
  );
}

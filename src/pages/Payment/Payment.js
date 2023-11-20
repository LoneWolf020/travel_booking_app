import { useNavigate, useParams } from "react-router-dom"
import { useDate, useHotel } from "../../context";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./Payment.css";
import { v4 as uuid } from "uuid";

export const Payment = () => {
    const params = useParams();
    const {id} = params;

    const navigate = useNavigate();

    const {guests, checkInDate, checkOutDate} = useDate();
    const {setHotel} = useHotel();
    
    const numberOfNights =
    checkInDate && checkOutDate
      ? (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
      : 0;

    const [singleHotel, setSingleHotel] = useState({});
    
    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get(`https://weak-jade-calf-slip.cyclic.app/api/hotels/${id}`);
                setSingleHotel(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id])

    const {image, name, address, state, rating, price} = singleHotel;
    const totalPayableAmount = price * numberOfNights + 150;

    const loadScript = (source) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = source;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };
  
    const handleConfirmBookingClick = async () => {
      const response = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!response) {
        console.log({ message: "Razorpay SDK failed to load" });
      }
  
      const options = {
        key: "rzp_test_VSdp7X3K39GwBK",
        amount: totalPayableAmount * 100,
        currency: "INR",
        name: "ChaleinG",
        email: "abc@mail.com",
        contact: "9898989898",
        description: "Thank you for booking with us",
  
        handler: ({ payment_id }) => {
          setHotel({...singleHotel, orderId: uuid(),
          payment_id, 
          checkInDate: checkInDate.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
          checkOutDate: checkOutDate.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
          totalPayableAmount});
          navigate("/order-summary");
        },
        prefill: {
          name: "ChaleinG Travels",
          email: "abc@mail.com",
          contact: "9898989898",
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }    

    return (
        <Fragment>
        <header className="heading">
          <h1 className="heading-1">
            <a className="navbar-brand test-1" href={"/"}>ChaleinG</a>
          </h1>
        </header>
        <main className="payment-page">
          <div className="final-details-container gap-md">
            <h2>Trip Details</h2>
            <div className="dates-and-guests gap-md">
              <h3>Your Trip</h3>
              <div>
                <p>Dates</p>
                <span>
                  {checkInDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  -
                  {checkOutDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
              <div>
                <p>Guests</p>
                <span>{guests} Guests</span>
              </div>
            </div>
            <div className="special-check gap-sm">
              <h3>Pay with</h3>
              <div>Razorpay</div>
            </div>
            <button
              className="button btn-primary btn-reserve cursor btn-pay"
              onClick={handleConfirmBookingClick}
            >
              Confirm Booking
            </button>
          </div>
          <div className="final-details special-check gap-large">
            <div className="fle-dis gap-sm">
              <img className="image" src={image} alt={name} />
              <div className="special-check">
                <div className="special-check grow-shrink-basis">
                  <span>{name}</span>
                  <span>
                    {address}, {state}
                  </span>
                </div>
                <div className="rating-container">
                  <span className="rating fle-dis align-center">
                    <span className="material-icons-outlined">star</span>
                    <span>{rating}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="tag">
              Your booking is protected by{" "}
              <strong className="strong">ChaleinG</strong> cover
            </div>
            <div className="price-detail-container">
              <div className="price-distribution special-check">
                <h3>Price Details</h3>
                <div className="final-price ">
                  <span className="span">
                    Rs. {price} x {numberOfNights} nights
                  </span>
                  <span className="span">Rs. {price * numberOfNights}</span>
                </div>
                <div className="final-price ">
                  <span className="span">Service fee</span>
                  <span className="span">Rs. 200</span>
                </div>
                <div className="final-price">
                  <span className="span">Total</span>
                  <span className="span">Rs. {totalPayableAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Fragment>
    )
}
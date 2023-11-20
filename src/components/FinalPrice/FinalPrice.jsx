import "./FinalPrice.css";
import { useAlert, useAuth, useDate } from "../../context";
import { DateSelector } from "../DateSelector/DateSelector";
import { useNavigate } from "react-router-dom";

export const FinalPrice = ({singleHotel}) => {

    const navigate  = useNavigate();
    const {setAlert} = useAlert();
    const {accessToken, authDispatch} = useAuth();

    const {guests, dateDispatch, checkInDate, checkOutDate} = useDate();
    const {_id, price, rating} = singleHotel;

    const handleGuestChange = (evt) => {
        dateDispatch({
            type: "GUESTS",
            payload: evt.target.value
        })
    }

    const handleReserveClick = () => {
        if (!checkInDate) {
          setAlert({
            open: true,
            message: "Select a Check-in Date",
            type: "info"
          })
        } else if (!checkOutDate) {
          setAlert({
            open: true,
            message: "Select a Check-out Date",
            type: "info"
          })
        } else if (guests < 1) {
          setAlert({
            open: true,
            message: "Add number of guests",
            type: "info"
          })
        } else if (accessToken) {
          navigate(`/confirm-booking/stay/${_id}`);
        } else {
          authDispatch({
            type: "SHOW_AUTH_MODAL"
          })
        }
      }

    return (
        <div className="price-details-container shadow">
            <div className="price-rating check">
                <p>
                    <span>Rs. {price}</span>/night
                </p>
                <span className="rating dispFlex">
                    <i className="fa-solid fa-star"></i>
                    <span>{rating}</span>
                </span>
            </div>
            <div className="check-2">
                <div className="grid-container-two-col selected-dates">
                    <div className="checkin loc-container">
                        <label className="label">Check In</label>
                        <DateSelector checkInType="in" />
                    </div>
                    <div className="checkin loc-container">
                        <label className="label">Check Out</label>
                        <DateSelector checkInType="out" />
                    </div>
                </div>
                <div className="guests gutter-sm">
                    <p>GUESTS</p>
                    {guests <= 0 ? (
                        <input 
                            className="guest-count-input"
                            type="number"
                            placeholder="add Guests"
                            value={guests}
                            onChange={handleGuestChange}
                            />
                    ) : (
                        <span>{guests} guests</span>
                    )}
                </div>
            </div>
            <div>
                <button className="btn-reserve cursor" onClick={handleReserveClick}>
                    Reserve
                </button>
            </div>
            <div className="price-distribution">
                <div className="final-price">
                    <span className="span">Rs. {price} x 2 nights</span>
                    <span className="span">Rs. {price * 2}</span>
                </div>
                <div className="final-price">
                    <span className="span">Service Fee</span>
                    <span className="span">Rs. 200</span>
                </div>
                <div className="final-price">
                    <span className="span">Total</span>
                    <span className="span">Rs. {price * 2 + 200}</span>
                </div>
            </div>
        </div>
    )
}
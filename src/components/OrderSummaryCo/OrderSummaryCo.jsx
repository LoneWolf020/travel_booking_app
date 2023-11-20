import { useNavigate } from "react-router-dom";
import { useDate, useFilter, useHotel} from "../../context";
import "./OrderSummaryCo.css";

export const OrderSummaryCo = () => {
    const navigate = useNavigate();
    const {dateDispatch} = useDate();
    const {filterDispatch} = useFilter();
    const {hotel} = useHotel();
    console.log({hotel});
    
    const { orderId, name, image, city, state, checkInDate, checkOutDate, totalPayableAmount} = hotel;

    const handleContinueBookingClick = () => {
        dateDispatch({
            type: "CLEAR_INPUTS"
        })
        filterDispatch({
            type: "CLEAR_ALL"
        })
        navigate("/");
    }

    return (
        <div className="os-container shadow gap">
            <div className="checkk-1 br-bottom pd-small">
                <h2>Order Summary</h2>
                <button className="button btn-auth btnn-close cursor-pointer" onClick={handleContinueBookingClick}>
                        <i className="fa-solid fa-xmark"></i>
                </button>
                
            </div>
            <span className="span-md">Booking ID: {orderId}</span>
            <div className="checkk-1 br-bottom pd-small">

                <div className="hoteldetails">
                    <span className="fs-md">{name}</span>
                    <span className="span-md">{city}, {state}</span>
                </div>
                <div>
                    <img className="img" src={image} alt={name} />
                </div>
            </div>
            <div className="checkk-3 gapp">
                <div className="checkk-3">
                    <span className="span-md">Check In</span>
                    <p className="fs-md">{checkInDate}, 11:00 AM</p>
                </div>
                <div className="checkk-3">
                    <span className="span-md">Check Out</span>
                    <p className="fs-md"> {checkOutDate}, 11:00 AM</p>
                </div>
                <div className="checkk-3">
                    <div className="checkk-1">
                        <span className="span-md">Total Amount  Paid</span>
                        <p className="fs-md">Rs. {totalPayableAmount}</p>
                    </div>
                </div>
            </div>
            <div>
                <button className="button btn-primary btn-reserve cursor" onClick={handleContinueBookingClick}>Continue Booking</button>
            </div>
        </div>
    )
}
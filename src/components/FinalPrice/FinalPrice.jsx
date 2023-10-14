import "./FinalPrice.css";

export const FinalPrice = ({singleHotel}) => {
    return (
        <div className="price-details-container shadow">
            <div className="price-rating check">
                <p>
                    <span>Rs. {singleHotel.price}</span>/night
                </p>
                <span className="rating dispFlex">
                    <i class="fa-solid fa-star"></i>
                    <span>{singleHotel.rating}</span>
                </span>
            </div>
            <div className="check-2">
                <div className="grid-container-two-col selected-dates">
                    <div className="checkin loc-container">
                        <label className="label">Check In</label>
                    </div>
                    <div className="checkin loc-container">
                        <label className="label">Check Out</label>
                    </div>
                </div>
                <div className="guests gutter-sm">
                    <p>GUESTS</p>
                    {singleHotel.guests <= 0 ? (
                        <input 
                            className="guest-count-input"
                            type="number"
                            placeholder="add Guests"
                            value={singleHotel.guests}
                            />
                    ) : (
                        <span>{singleHotel.guests} guests</span>
                    )}
                </div>
            </div>
            <div>
                <button className="btn-reserve cursor">
                    Reserve
                </button>
            </div>
            <div className="price-distribution">
                <div className="final-price">
                    <span className="span">Rs. {singleHotel.price} x 2 nights</span>
                    <span className="span">Rs. {singleHotel.price * 2}</span>
                </div>
                <div className="final-price">
                    <span className="span">Service Fee</span>
                    <span className="span">Rs. 200</span>
                </div>
                <div className="final-price">
                    <span className="span">Total</span>
                    <span className="span">Rs. {singleHotel.price * 2 + 200}</span>
                </div>
            </div>
        </div>
    )
}
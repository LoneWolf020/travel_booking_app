import "./HotelDetails.css";

export const HotelDetails = ({singleHotel}) => {
    return (
        <div className="hotel-detail-container">
            <div className="host-details">
                <p className="host-name">
                    Hosted By {singleHotel.hostName}
                </p>
                <div className="span hotel-room-details">
                    {singleHotel.numberOfguest} guests. {singleHotel.numberOfBedrooms} bedrooms. {singleHotel.numberOfBeds}{" "}
                    beds. {singleHotel.numberOfBathrooms} bathrroms.
                </div>
            </div>
            <div className="key-features host-details">
                <div className="gutter-bottom-small">
                    <p className="gutter-bottom">
                        <i class="fa-solid fa-feather"></i>Dedicated WorkSpace
                    </p>
                    <span className="span">
                        A common area with wifi that is well suited for working
                    </span>
                </div>
                <div className="gutter-bottom-small">
                    <p className="gutter-bottom">
                        <i class="fa-solid fa-feather"></i>Great Location
                    </p>
                    <span className="span">
                        80% of recent guests gave the location a 5-star rating
                    </span>
                </div>
                <p className="gutter-bottom">
                    <i class="fa-solid fa-feather"></i>Free cancellation before 7 days of booking
                </p>
            </div>
            <div className="amenities-container">
                <p className="amenities">What this place offers</p>
                <div className="amenities-div">
                    <div className="amenities-div amenities-col">
                        <span className="span gutter-bottom">
                            <i class="fa-solid fa-feather"></i>Kitchen icon
                        </span>
                        <span className="span gutter-bottom">
                            <i class="fa-solid fa-feather"></i>Free Parking
                        </span>
                        <span className="span gutter-bottom">
                            <i class="fa-solid fa-feather"></i>Dedicated Workspace
                        </span>
                    </div>
                    <div className="amenities-div amenities-col">
                        <span className="span gutter-bottom">
                            <i class="fa-solid fa-feather"></i>Wifi Icon
                        </span>
                        <span className="span gutter-bottom">
                            <i class="fa-solid fa-feather"></i>Washing Machine
                        </span>
                        <span className="span gutter-bottom">
                            <i class="fa-solid fa-feather"></i>Patio or Balcony
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
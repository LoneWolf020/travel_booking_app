import "./Hotelcard.css";
import { useNavigate } from "react-router-dom";

export const Hotelcard = ({hotel}) => {

    const { _id, name, image, address, state, rating, price } = hotel;

    const navigate = useNavigate();
    const handleHotelCardClick = () => {
        navigate(`/hotels/${name}/${address}=${state}/${_id}/reserve`);
    };

    return (
        

        <div className="card hotelcard-container">
            <div onClick={handleHotelCardClick}>
            <img src={image} className="card-img-top img" alt={name} />
            <div className="card-body">
                <div className="d-flex align-center">
                    <span className="location">{address}, {state}</span>
                    <span className="rating d-flex align-center">
                        <span className="fa-solid fa-star"></span>
                        <span>{rating}</span>
                    </span>
                </div>

                <p className="hotel-name">{name}</p>
                <p className="price-details">
                    <span className="price">Rs {price}</span>
                    <span>/night</span>
                </p>
            </div>
            </div>
            <button className="btn-wishlist">
                <span className="fa-regular fa-heart favorite"></span>
            </button>
        </div>

    )
}
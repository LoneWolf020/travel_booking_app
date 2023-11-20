import "./Hotelcard.css";
import { useNavigate } from "react-router-dom";
import { useWishlist, useAuth, useAlert } from "../../context";
import { findHotelInWishlist } from "../../utils";

export const Hotelcard = ({hotel}) => {

    const { _id, name, image, address, state, rating, price } = hotel;

    const {wishlistDispatch, wishlist} = useWishlist();
    const {accessToken, authDispatch} = useAuth();
    const {setAlert} = useAlert();

    const isHotelInWishlist = findHotelInWishlist(wishlist, _id);

    const navigate = useNavigate();

    const handleHotelCardClick = () => {
        navigate(`/hotels/${name}/${address}=${state}/${_id}/reserve`);
    };

    const handleWishlistClick = () => {
        if(accessToken) {
            if(!isHotelInWishlist) {
                wishlistDispatch({
                    type: "ADD_TO_WISHLIST",
                    payload: hotel
                })
                setAlert({
                    open: true,
                    message: `Hotel:: ${name} added to wishlist`,
                    type: "success"
                  })                
            } else {
                wishlistDispatch({
                    type: "REMOVE_FROM_WISHLIST",
                    payload: _id
                })
                setAlert({
                    open: true,
                    message: `Hotel:: ${name} removed from wishlist`,
                    type: "success"
                  })                
            } 
        } else {
            authDispatch({
                type: "SHOW_AUTH_MODAL"
            })
        }
    }

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
            <button className="btn-wishlist" onClick={handleWishlistClick}>
                <span className={`fa-regular fa-heart favorite ${isHotelInWishlist ? "fav-selected" : ""}`}></span>
            </button>
        </div>

    )
}
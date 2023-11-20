import { useNavigate } from "react-router-dom";
import { useAlert, useAuth, useDate, useFilter, useWishlist } from "../../context";
import "./ProfileDropDown.css";

export const ProfileDropDown = () => {
    const {authDispatch} = useAuth();
    const {dateDispatch} = useDate();
    const {filterDispatch} = useFilter();
    const {wishlistDispatch} = useWishlist();
    const {setAlert} = useAlert();
    
    const navigate = useNavigate();

    const handleWishlistClick = () => {
        authDispatch({
            type: "SHOW_DROP_DOWN_OPTIONS"
        })
        navigate("/wishlist");
    }

    const handleLogoutClick = () => {
        authDispatch({
            type: "CLEAR_USER_DATA"
        })
        authDispatch({
            type: "CLEAR_CREDENTIALS"
        })
        authDispatch({
            type: "SHOW_DROP_DOWN_OPTIONS"
        })
        dateDispatch({
            type: "CLEAR_INPUTS"
        })
        filterDispatch({
            type: "CLEAR_ALL"
        })
        wishlistDispatch({
            type: "CLEAR_WISHLIST"
        })
        navigate("/")
        setAlert({
            open: true,
            message: "Logged out successfully",
            type: "success"
        })
    }

    return (
        <div className="drop-down-container shadow ">
            <span className="option-span wishlist-span cursor-pointer gappp" onClick={handleWishlistClick}>
                <span className="fa-regular fa-heart favorite"></span>
                Wishlist
            </span>
            <span className="option-span logout cursor-pointer gappp" onClick={handleLogoutClick}>
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout</span>
        </div>
    )
}
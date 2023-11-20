import "./Navigationbar.css";
import { useDate, useAuth } from "../../context";

export const Navigationbar = () => {

    const { checkInDate, checkOutDate, dateDispatch, destination, guests } = useDate();
    const {authDispatch, accessToken} = useAuth();

    const handleSearchClick = () => {
        dateDispatch({
            type: "OPEN_SEARCH_MODAL"
        })
    }

    const handleAuthClick = () => {
        if (accessToken) {
            authDispatch({
              type: "SHOW_DROP_DOWN_OPTIONS"
            })
          } else {
            authDispatch({
              type: "SHOW_AUTH_MODAL",
            });
          }
    }

    return (

        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid heading">
                <a className="navbar-brand test-1" href={"/"}>ChaleinG</a>

                <div className="form-container cursor-pointer nav" onClick={handleSearchClick}>
                    <span className="form-option">{destination || "Anywhere"}</span>
                    <span className="border-right-1px"></span>
                    <span className="form-option">{checkInDate && checkOutDate ? `${checkInDate.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                    })} - ${checkOutDate.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                    })}`
                        : "Any Week"}</span>
                    <span className="border-right-1px"></span>
                    <span className="form-option">{guests > 0 ? `${guests}` :"Add guest"}</span>
                    <i className="fa-solid fa-magnifying-glass search"></i>
                </div>


                <div className="navbar-nav nav cursor-pointer" onClick={handleAuthClick}>

                    <i className="fa-solid fa-bars profile-option menu"></i>
                    <i className="fa-regular fa-user profile-option person"> </i>

                </div>

            </div>
        </nav>


    )
}
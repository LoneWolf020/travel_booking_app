import { DateSelector } from "../DateSelector/DateSelector";
import "./SearchStayDate.css";
import { useDate, useCategory } from "../../context";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const SearchStayDate = () => {

    const [hotels, setHotels] = useState([]);
    const { hotelCategory } = useCategory();
    const { destination, guests, isSearchResultOpen, dateDispatch } = useDate();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`https://weak-jade-calf-slip.cyclic.app/api/hotels?category=${hotelCategory}`);
                setHotels(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [hotelCategory]);

    const handleSearchButtonClick = () => {
        dateDispatch({
            type: "CLOSE_SEARCH_MODAL",
        })
        navigate(`/hotels/${destination}`);
    }

    const handleDestinationChange = (evt) => {
        dateDispatch({
            type: "DESTINATION",
            payload: evt.target.value
        })
    }

    const destinationOptions = hotels.filter(({ address, city, state, country }) =>
        address.toLowerCase().includes(destination.toLowerCase()) ||
        city.toLowerCase().includes(destination.toLowerCase()) ||
        state.toLowerCase().includes(destination.toLowerCase()) ||
        country.toLowerCase().includes(destination.toLowerCase())
    );

    const handleGuestChange = (evt) => {
        dateDispatch({
            type: "GUESTS",
            payload: evt.target.value
        })
    }

    const handleSearchResultClick = (address) => {
        dateDispatch({
            type: "DESTINATION",
            payload: address
        })
    }

    const handleDestinationFocus = () => {
        dateDispatch({
            type: "SHOW_SEARCH_RESULT"
        })
    }

    return (
        <div className="destination-container">
            <div className="destionation-options">
                <div className="location-container">
                    <label className="lavel">Where</label>
                    <input onChange={handleDestinationChange} autoFocus value={destination} onFocus={handleDestinationFocus}
                        type="text" className="input search-dest" placeholder="Search Destination" />
                </div>
                <div className="location-container">
                    <label className="lavel">Check In</label>
                    <DateSelector checkInType="in" />
                </div>
                <div className="location-container">
                    <label className="lavel">Check Out</label>
                    <DateSelector checkInType="out" />
                </div>
                <div className="location-container">
                    <label className="label">No. of Guests</label>
                    <input className="input search-dest" onChange={handleGuestChange} value={guests} placeholder="Add guests" />
                </div>
                <div className="search-container cursor-pointer" on onClick={handleSearchButtonClick}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <span>Search</span>
                </div>
            </div>
            {
                isSearchResultOpen && (
                    <div className="search-result-container">
                        {destinationOptions && destinationOptions.map(({ address, city }) => (
                            <p className="p cursor-pointer" onClick={() => handleSearchResultClick(address)}>
                                {address}, {city}
                            </p>
                        ))}
                    </div>
                )
            }
        </div>
    )
}
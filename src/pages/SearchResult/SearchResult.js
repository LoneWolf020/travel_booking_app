import "./SearchResult.css";
import {useAlert, useCategory, useDate} from "../../context";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {Navigationbar, Hotelcard, Alert} from "../../components";

export const SearchResult = () => {
    const {hotelCategory} = useCategory();
    const {destination} = useDate();
    const [hotels, setHotels] = useState([]);
    const {alert} = useAlert();
    console.log(hotelCategory);

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get(`https://weak-jade-calf-slip.cyclic.app/api/hotels?category=${hotelCategory}`)
                setHotels(data);
            } catch (error) {
                console.log(error);
            }
        })();
    },[destination, hotelCategory])

    const filterSearchResults = hotels.filter(({city, address, state}) => 
        address.toLowerCase() === destination.toLowerCase() ||
        city.toLowerCase() === destination.toLowerCase() ||
        state.toLowerCase() === destination.toLowerCase()
      );

      return (
        <Fragment>
            <Navigationbar />
            <section className="main search-result">
                {filterSearchResults ? (
                    filterSearchResults.map((hotel) => (
                        <Hotelcard key={hotel._id} hotel={hotel} />
                    ))
                ) : (
                    <h3>No Result Found</h3>
                )}
            </section>
            {alert.open && <Alert />}
        </Fragment>
      )
}
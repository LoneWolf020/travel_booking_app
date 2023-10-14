import { useEffect, useState } from "react";
import { Navigationbar } from "../../components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HotelImages, HotelDetails, FinalPrice } from "../../components";
import "./SingleHotel.css";


export const SingleHotel = () => {

    const {id} = useParams();
    const [singleHotel, setSingleHotel] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get(`https://weak-jade-calf-slip.cyclic.app/api/hotels/${id}`);
                setSingleHotel(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id])

    const {name, state} = singleHotel;

    return (
        <div className="">
            <Navigationbar />
            <main className="single-hotel-page">
                <p className="hotel-name-add">
                    {name}, {state}
                </p>
                <HotelImages singleHotel={singleHotel} />
                <div className="dispFlex">
                    <HotelDetails singleHotel={singleHotel} />
                    <FinalPrice singleHotel={singleHotel} />
                </div>
            </main>
        </div>
    )
}
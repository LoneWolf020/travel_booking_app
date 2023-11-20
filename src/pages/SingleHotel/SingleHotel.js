import { useEffect, useState } from "react";
import { Navigationbar } from "../../components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HotelImages, HotelDetails, FinalPrice, Alert, SearchStayDate, ProfileDropDown, AuthModal } from "../../components";
import "./SingleHotel.css";
import { useAlert, useAuth, useDate } from "../../context";


export const SingleHotel = () => {

    const {id} = useParams();
    const [singleHotel, setSingleHotel] = useState({});

    const {isAuthModalOpen, isDropDownModalOpen} = useAuth();
    const {isSearchModalOpen} = useDate();
    const {alert} = useAlert();

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
            {isSearchModalOpen && <SearchStayDate />}
            {isDropDownModalOpen && <ProfileDropDown />}
            {isAuthModalOpen && <AuthModal />}
            {alert.open && <Alert />}
        </div>
    )
}
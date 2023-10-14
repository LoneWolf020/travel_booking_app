import { DateSelector } from "../DateSelector/DateSelector";
import "./SearchStayDate.css";

export const SearchStayDate = () => {
    return (
        <div className="destination-container">
            <div className="destionation-options">
                <div className="location-container">
                    <label className="lavel">Check In</label>
                    <DateSelector checkInType="in" />
                </div>
                <div className="location-container">
                    <label className="lavel">Check Out</label>
                    <DateSelector checkInType="out" />
                </div>
            </div>
        </div>
    )
}
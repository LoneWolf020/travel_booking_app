import "./DateSelector.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDate } from "../../context";

export const DateSelector = ({checkInType}) => {

    const {checkInDate, checkOutDate, dateDispatch} = useDate();

    return (
        <DatePicker
            className="search-dest input"
            selected={checkInType === "in" ? checkInDate : checkOutDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Add Dates"
            minDate={new Date()}
            closeOnScroll={true}
        />    
    )
}
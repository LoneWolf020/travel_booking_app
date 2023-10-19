import "./DateSelector.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDate } from "../../context";

export const DateSelector = ({checkInType}) => {

    const {checkInDate, checkOutDate, dateDispatch} = useDate();

    const handleDateFocus = () => {
        dateDispatch({
            type: "DATE_FOCUS"
        })
    }

    const handleDateChange = (date) => {
        dateDispatch({
          type: checkInType === "in" ? "CHECK_IN" : "CHECK_OUT",
          payload: date,
        });
    }

    return (
        <DatePicker
            className="search-dest input"
            selected={checkInType === "in" ? checkInDate : checkOutDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => handleDateChange(date)}
            onFocus={handleDateFocus}
            placeholderText="Add Dates"
            minDate={new Date()}
            closeOnScroll={true}
        />    
    )
}
import "./FreeCancel.css";
import { useFilter } from "../../../context";

export const FreeCancel = () => {

    const {filterDispatch, isCancelable} = useFilter();

    const handleCancelChange = (evt) => {
        filterDispatch({
            type: "CANCELABLE",
            payload: evt.target.checked
        })
    }

    return (
        <div className="filter-container">
            <div className=" cancel-1">
                <span className="filter-label">Free Cancellation</span>
                <label className="slide">
                    <input type="checkbox" checked={isCancelable} value={isCancelable} onChange={handleCancelChange}/>
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )
}
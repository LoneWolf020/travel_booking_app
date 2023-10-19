import "./Filter.css";
import { PriceRange, RoomsBeds, PropertyType, FreeCancel, Rating } from "./index";
import {useFilter} from "../../context";

export const Filter = () => {

    const {filterDispatch} = useFilter();

    const handleFilterCloseClick = () => {
        filterDispatch({
            type: "SHOW_FILTER_MODAL"
        })
    }

    const handleClearFilterClick = () => {
        filterDispatch({
            type: "CLEAR_ALL"
        })
    }

    return (
        <div className="filter-modal">
            <div className="filter-page shadow">
                <div className="filter-top">
                    <span className="filter-label">Filter</span>
                    <button className="button btn-filter-close cursor-pointer" onClick={handleFilterCloseClick}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <PriceRange />
                <RoomsBeds />
                <PropertyType />
                <Rating />
                <FreeCancel />

                <div className="clear-all-button">
                    <button className="btn cursor btn-link-primary button-1" onClick={handleClearFilterClick}>
                        Clear All
                    </button>
                </div>
            </div>
        </div>
    )
}
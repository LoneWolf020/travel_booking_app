import { v4 as uuid} from "uuid";
import { useFilter } from "../../../context";

const propertyTypes = [
    {id: uuid(), type: "House"},
    {id: uuid(), type: "Guest House"},
    {id: uuid(), type: "Flat"},
    {id: uuid(), type: "Hotel"}
]

export const PropertyType = () => {

    const {propertyType, filterDispatch} = useFilter();

    const handlePropertyClick = (property) => {
        filterDispatch({
            type: "PROPERTY_TYPE",
            payload: property
        })
    }

    return (
        <div className="filter-container">
            <span className="filter-label">Property Type</span>
            <div className="prop-1">
                {
                    propertyTypes.map(({id, type}) => (
                        <span className={`span-label property-type item-1 cursor-pointer on-hover 
                            ${propertyType === type ? "selected" : ""}`} key={id} onClick={() => handlePropertyClick(type)}>
                            {type}
                        </span>
                    ))
                }
            </div>
        </div>
    )
}
import { useFilter } from "../../../context";

const ratings = ["1", "2", "3", "4", "5"];

export const Rating = () => {

    const {filterDispatch} = useFilter();

    const handleRatingClick = (rating) => {
        filterDispatch({
            type: "RATING",
            payload: rating
        })
    }

    return (
        <div className="filter-container">
            <span className="filter-label">Ratings</span>
            <div className="">
                {
                    ratings.map((rating) => (
                        <span className={`span-label aminity-count star rating-1 cursor-pointer on-hover`}
                             key={rating} onClick={() => handleRatingClick(rating)}>
                            {rating} &Up
                        </span>
                    ))
                }
            </div>
        </div>
    )
}
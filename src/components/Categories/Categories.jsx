import axios from "axios";
import { useEffect, useState } from "react";
import "./Categories.css"
import { useCategory, useFilter } from "../../context";

export const Categories = () => {

    const [categories, setCategories] = useState([]);
    const {hotelCategory, setHotelCategory} = useCategory();
    const {isFilterModalOpen, filterDispatch} = useFilter();

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get("https://weak-jade-calf-slip.cyclic.app/api/categories");
                setCategories(data.slice(0,10));
                console.log(categories);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleCategoryClick = (category) => {
        setHotelCategory(category);
        console.log("clicked ", category);
    }

    const handleFilterClick = () => {
        filterDispatch({
            type: "SHOW_FILTER_MODAL"
        })
    }

    
    return (
        <section className="categories">
            <button className="button btn-category btn-left fixed cursor-pointer">
            <i class="fa-solid fa-angle-left"></i>
            </button>

            
                {
                    categories && categories.map(({_id, category}) => 
                    <span key={_id} className={`${category === hotelCategory ? "category-color" : ""} item`} onClick={() => handleCategoryClick(category)}>
                        {category}
                    </span>
                    )
                }
            
                
            <button className="right-btn" >
                <i class="fa-solid fa-angle-right"></i>
            </button>
                
            <button className="btn btn-filter cursor-pointer filter-1" onClick={handleFilterClick}>
                <i class="fa-solid fa-filter"></i>
                <span>Filter</span>
            </button>
            
        </section>
    )
}
import axios from "axios";
import { useEffect, useState } from "react";
import "./Categories.css"
import { useCategory } from "../../context/category-context";

export const Categories = () => {

    const [categories, setCategories] = useState([]);
    const {hotelCategory, setHotelCategory} = useCategory();
    console.log(hotelCategory);

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
                
            
            
        </section>
    )
}
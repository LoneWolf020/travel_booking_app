import { useEffect, useState } from "react";
import { Navigationbar, Hotelcard, Categories } from "../../components/index";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Home.css"
import { useCategory } from "../../context/category-context";

export const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(20);
  const [testData, setTestData] = useState([]);
  const {hotelCategory} = useCategory();
  console.log("home- ", typeof(hotelCategory));

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://weak-jade-calf-slip.cyclic.app/api/hotels?category=${hotelCategory}`
        );
        console.log("data ", data);
        setTestData(data);
        setHotels(data ? data.slice(0, 20) : []);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [hotelCategory]);

  const fetchMoreData = () => {
    if(hotels.length >= testData.length){
        setHasMore(false);
        return;
    }
    setTimeout(() => {
        if (hotels && hotels.length > 0){
            setHotels(hotels.concat(testData.slice(currentIndex, currentIndex + 20)));
            setCurrentIndex((prev) => prev + 20);
        } else {
            setHotels([]);
        }
    }, 1000);
  }

  return (
    <div className="relative">
      <Navigationbar />
      <Categories />
      {hotels && hotels.length > 0 ? (
        <InfiniteScroll dataLength={hotels.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={hotels.length > 0 && <h3 className="alert-text">Loading...</h3>}
            endMessage={<p className="alert-text">You have seen it all</p>}
        >
            <main className="main gap-larger">
                {hotels && hotels.map((hotel) => <Hotelcard key={hotel._id} hotel={hotel} />)}
            </main>
        </InfiniteScroll>
      ) : (
        <></>
      )}
      
    </div>
  );
};

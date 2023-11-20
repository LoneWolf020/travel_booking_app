import { useEffect, useState } from "react";
import { Navigationbar, Hotelcard, Categories, SearchStayDate, Filter, AuthModal, Alert, ProfileDropDown } from "../../components/index";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Home.css"
import { useCategory, useDate, useFilter, useAuth, useAlert } from "../../context";
import { getHotelsByPrice, getHotelsByRoomsBeds, getHotelsByPropertyType, getHotelsByRatings, getHotelsByCancelation } from "../../utils";

export const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(20);
  const [testData, setTestData] = useState([]);

  const {hotelCategory} = useCategory();
  const {isSearchModalOpen} = useDate();
  const {isFilterModalOpen, priceRange, noOfBathrooms, noOfBedrooms, noOfBeds, propertyType, chaleinRating,isCancelable} = useFilter();
  const {isAuthModalOpen, isDropDownModalOpen} = useAuth();
  const {alert} = useAlert();

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

  const filteredHotelsByPrice = getHotelsByPrice(hotels, priceRange);
  const filteredHotelsByBedsRooms = getHotelsByRoomsBeds(filteredHotelsByPrice, noOfBathrooms, noOfBedrooms, noOfBeds);
  const filteredHotelsByPropertyType = getHotelsByPropertyType(filteredHotelsByBedsRooms, propertyType);
  const filteredHotelsByRatings = getHotelsByRatings(filteredHotelsByPropertyType, chaleinRating);
  const filteredHotelsByCancellation = getHotelsByCancelation(filteredHotelsByRatings, isCancelable);

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
                {filteredHotelsByCancellation && filteredHotelsByCancellation.map((hotel) => <Hotelcard key={hotel._id} hotel={hotel} />)}
            </main>
        </InfiniteScroll>
      ) : (
        <></>
      )}

      {isSearchModalOpen && <SearchStayDate />}
      {isFilterModalOpen && <Filter />}
      {isAuthModalOpen && <AuthModal />}
      {isDropDownModalOpen && <ProfileDropDown />}
      {alert.open && <Alert />}
    </div>
  );
};

import {Route, Routes} from "react-router-dom";
import './App.css';
import {Home, SingleHotel, SearchResult, Wishlist, Payment, OrderSummary} from "./pages/index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels/:name/:address/:id/reserve" element={<SingleHotel />} />
      <Route path="/hotels/:address" element={<SearchResult />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/confirm-booking/stay/:id" element={<Payment />} />
      <Route path="/order-summary" element={<OrderSummary />} />
    </Routes>
  );
}

export default App;

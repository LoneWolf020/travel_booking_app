import {Route, Routes} from "react-router-dom";
import './App.css';
import {Home, SingleHotel, SearchResult} from "./pages/index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels/:name/:address/:id/reserve" element={<SingleHotel />} />
      <Route path="/hotels/:address" element={<SearchResult />} />
    </Routes>
  );
}

export default App;

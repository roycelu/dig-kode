import { useState } from "react";
import { Search } from "./components/Search";
import { StationList } from "./components/StationList";
import "./App.css";

function App() {
  const [searchWord, setSearchWord] = useState("");

  return (
    <div className="App">
      <img src="/oslo_city_bike_logo.png" alt="Oslo Bysykkel logo" />
      <h1>Oslo Bysykkel</h1>
      <Search
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
      />
      <StationList searchWord={searchWord} />
    </div>
  );
}

export default App;

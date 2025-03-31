import { useState } from "react";
import "./SearchBar.scss";
import Selection from "./Selection";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const rooms = [
    {
      id: "B1-201",
      name: "B1-201",
    },
    {
      id: "B1-202",
      name: "B1-202",
    },
    {
      id: "B1-203",
      name: "B1-203",
    },
    {
      id: "B1-204",
      name: "B1-204",
    },
    {
      id: "B1-205",
      name: "B1-205",
    },
  ];

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="search-room">
      <div className="search-form">
        <Selection options={rooms} id="room" />
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>
      <button className="search-button">
        <SearchIcon className="search-icon" />
        <p>Search</p>
      </button>
    </div>
  );
};

export default SearchBar;

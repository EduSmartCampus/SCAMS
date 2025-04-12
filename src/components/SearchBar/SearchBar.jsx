import { useState } from "react";
import "./SearchBar.scss";
import Selection from "./Selection";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import DateSelector from "../DateSelector/DateSelector";

const SearchBar = () => {
  const [selectedRoom, setSelectedRoom] = useState("B1-201");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

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
    {
      id: "B1-206",
      name: "B1-206",
    },
    {
      id: "B1-207",
      name: "B1-207",
    },
    {
      id: "B1-208",
      name: "B1-208",
    },
    {
      id: "B1-209",
      name: "B1-209",
    },
    {
      id: "B1-210",
      name: "B1-210",
    },
    {
      id: "B4-304",
      name: "B4-304",
    },
    {
      id: "B8-205",
      name: "B8-205",
    },
    {
      id: "C4-504",
      name: "C4-504",
    },
    {
      id: "C4-306",
      name: "C4-306",
    },
    {
      id: "B2-310",
      name: "B2-310",
    },
    {
      id: "B5-103",
      name: "B5-103",
    },
    {
      id: "B9-301",
      name: "B9-301",
    },
    {
      id: "B2-202",
      name: "B2-202",
    },
    {
      id: "B3-112",
      name: "B3-112",
    },
    {
      id: "C6-301",
      name: "C6-301",
    },
  ];

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSearch = () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }
    navigate(`/room/${selectedRoom}`);
  };

  return (
    <div className="search-room">
      <div className="search-form">
        <Selection options={rooms} id="room" onChange={setSelectedRoom} />
        <DateSelector selectedDate={selectedDate} handleDateChange={handleDateChange} />
      </div>
      <button className="search-button" onClick={handleSearch}>
        <SearchIcon className="search-icon" />
        <p>Search</p>
      </button>
    </div>
  );
};

export default SearchBar;

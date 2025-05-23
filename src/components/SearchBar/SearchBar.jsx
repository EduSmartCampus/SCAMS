import { useState } from "react";
import "./SearchBar.scss";
import Selection from "./Selection";
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { useFilter } from "../../context/FilterContext";

const SearchBar = () => {
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const { applyFilter, clearFilter } = useFilter();

  const buildings = [
    {
      id: "",
      name: "Choose building"
    },
    {
      id: "B1",
      name: "B1",
    },
    {
      id: "B2",
      name: "B2",
    },
    {
      id: "B3",
      name: "B3",
    },
    {
      id: "B4",
      name: "B4",
    },
    {
      id: "B5",
      name: "B5",
    },
    {
      id: "B8",
      name: "B8",
    },
    {
      id: "B9",
      name: "B9",
    },
    {
      id: "A1",
      name: "A1",
    },
    {
      id: "A2",
      name: "A2",
    },
    {
      id: "A3",
      name: "A3",
    },
    {
      id: "A4",
      name: "A4",
    },
    {
      id: "A5",
      name: "A5",
    },
    {
      id: "C4",
      name: "C4",
    },
    {
      id: "C5",
      name: "C5",
    },
    {
      id: "C6",
      name: "C6",
    }
  ];

  const floors = [
    {
      id: "",
      name: "Choose floor"
    },
    {
      id: "1",
      name: "1"
    },
    {
      id: "2",
      name: "2"
    },
    {
      id: "3",
      name: "3"
    },
    {
      id: "4",
      name: "4"
    },
    {
      id: "5",
      name: "5"
    },
    {
      id: "6",
      name: "6"
    }
  ]

  const handleApply = () => {
    applyFilter(selectedBuilding, selectedFloor);
  }

  const handleClear = () => {
    setSelectedBuilding("");
    setSelectedFloor("");
    clearFilter();
  }

  return (
    <div className="filter-room">
      <div className="filter-form">
        <Selection options={buildings} id="room" value={selectedBuilding} onChange={setSelectedBuilding} />
        <Selection options={floors} id="room" value={selectedFloor} onChange={setSelectedFloor} />
      </div>
      <button className="filter-button" onClick={handleApply}>
        <FilterListIcon className="filter-icon" />
      </button>
      <button className="filter-button" onClick={handleClear}>
        <FilterListOffIcon className="filter-icon" />
      </button>
    </div>
  );
};

export default SearchBar;

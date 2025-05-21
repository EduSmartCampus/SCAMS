import "./ListRoom.scss";
import Grid from "@mui/material/Grid";
import RoomGrid from "../ListRoom/RoomGrid";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useFilter } from "../../context/FilterContext";
import CircularProgress from "@mui/material/CircularProgress";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const token = localStorage.getItem("authToken");
  const { filter, clearFilter } = useFilter();

  const fetchListRooms = async () => {
    try {
      setIsLoad(true);

      const response = await axios.get("http://localhost:3000/rooms", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setRooms(response.data);
    } catch (error) {
      toast.error("Error fetching rooms");
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    fetchListRooms();

    return () => {
      clearFilter();
    };
  }, []);

  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString(undefined, options);

  const filteredRooms = rooms.filter(
    (room) =>
      (filter.building === "" || room.building === filter.building) &&
      (filter.floor === "" ||
        Math.floor(room.room_number / 100).toString() === filter.floor)
  );

  return (
    <div className="list">
      <h1>List of rooms ({formattedDate})</h1>
      {isLoad ? (
        <div className="loading-container">
          <CircularProgress
            className="icon"
            size="40px"
            style={{ color: "#0a75ad" }}
          />
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="no-room">
          <h1>No rooms found!</h1>
        </div>
      ) : (
        <div className="room-list">
          <Grid spacing={1} container justifyContent="center">
            {filteredRooms.map((room) => (
              <Grid key={room._id} xs={12} sm={6} md={4} lg={3}>
                <RoomGrid room={room} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default ListRoom;

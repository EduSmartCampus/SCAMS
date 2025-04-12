import "./ListRoom.scss";
import Grid from "@mui/material/Grid";
import RoomGrid from "../ListRoom/RoomGrid";

const ListRoom = () => {
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

  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  return (
    <div className="list">
      <h1>List of rooms ({formattedDate})</h1>
      <div className="room-list">
        <Grid spacing={1} container justifyContent="center">
          {rooms.map((room) => (
            <Grid key={room.id} xs={12} sm={6} md={4} lg={3}>
              <RoomGrid room={room} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ListRoom;

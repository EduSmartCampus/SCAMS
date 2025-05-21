import './NotedStatus.scss'

const NotedStatus = () => {
  return (
    <div className="noted">
      <div className="legend-item">
        <div className="color-box complete"></div>
        <span>Completed</span>
      </div>
      <div className="legend-item">
        <div className="color-box ongoing"></div>
        <span>Ongoing</span>
      </div>
      <div className="legend-item">
        <div className="color-box upcoming"></div>
        <span>Upcoming</span>
      </div>
    </div>
  );
};

export default NotedStatus;

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({ percentage, value }) => {
  // total evaluations held
  // the amount of evluations held

  return (
    <div
      style={{
        textAlign: "center",
        width: "300px",
        margin: "auto",
        fontSize: "20px",
        backgroundColor: "#ffff",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <CircularProgressbar
        value={percentage}
        text={`${value}/${4}`}
        styles={buildStyles({
          textSize: "20px",
          pathColor: `#2732FF`,
          textColor: "#2732FF",
          trailColor: "#d6d6d6",
          strokeWidth: 100,
        })}
      />
      <div className="labels">
        <span className="completed"> Completed</span>
        <span className="incomplete"> Incomplete</span>
      </div>
    </div>
  );
};

export default CircularProgressBar;

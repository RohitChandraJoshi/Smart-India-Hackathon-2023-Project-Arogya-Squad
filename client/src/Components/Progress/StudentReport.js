import CircularProgressBar from "./Visuals/ProgressBar";
import "chart.js/auto";

import BarChart from "./Visuals/BarChart";
import { useEffect, useState } from "react";
export default function StudentProgress({ labels, values, evaluations }) {
  const [modifiedLabels, updateLabels] = useState(labels);
  useEffect(() => {
    labels.forEach((element, idx) => {
      const words = element.split(/\s+/);
      if (words.length > 4) {
        const modifiedStr = words.slice(0, 4).join(" ") + "...";
        labels[idx] = modifiedStr;
      }
    });
    updateLabels(labels);
  }, [labels]);
  return (
    <div className="student-progress">
      <h3>Student Progress Report</h3>
      <div className="project-report">
        <div className="bar-chart">
          <h3>Grade Report </h3>
          <BarChart labels={modifiedLabels} values={values} />
        </div>
        <div className="progress-chart">
          <h3>Evaluations Completed</h3>
          <CircularProgressBar
            value={evaluations}
            percentage={(evaluations / 4) * 100}
          />
        </div>
      </div>
    </div>
  );
}

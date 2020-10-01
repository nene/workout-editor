import React from "react";

const Bar: React.FC<{ width: string; height: string; background: string }> = ({ width, height, background }) => (
  <div style={{ display: "inline-block", verticalAlign: "bottom", paddingBottom: height, background, width, borderRadius: "10px", marginRight: "0.1%" }} />
);

export const WorkoutPlot: React.FC<{}> = () => {
  return (
    <div style={{ whiteSpace: "nowrap", overflow: "hidden", width: 800, outline: "1px dashed #0c0" }}>
      <Bar background="#7f7f7f" width="1%" height="7.5%" />
      <Bar background="#7f7f7f" width="1%" height="10%" />
      <Bar background="#7f7f7f" width="1%" height="12.5%" />
      <Bar background="#7f7f7f" width="1%" height="15%" />
      <Bar background="#338cff" width="5%" height="20%" />
      <Bar background="#ffcc3f" width="15%" height="25%" />
      <Bar background="#338cff" width="5%" height="20%" />
      <Bar background="#ffcc3f" width="15%" height="25%" />
      <Bar background="#338cff" width="5%" height="20%" />
      <Bar background="#ffcc3f" width="15%" height="25%" />
      <Bar background="#338cff" width="5%" height="20%" />
      <Bar background="#7f7f7f" width="1%" height="15%" />
      <Bar background="#7f7f7f" width="1%" height="12.5%" />
      <Bar background="#7f7f7f" width="1%" height="10%" />
      <Bar background="#7f7f7f" width="1%" height="7.5%" />
    </div>
  );
}
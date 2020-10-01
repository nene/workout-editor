import React from "react";
import styled from "styled-components";

const Bar = styled.div<{ width: string; height: string; background: string }>`
  display: inline-block;
  border-radius: 10px;
  margin-right: 0.1%;
  vertical-align: bottom;
  padding-bottom: ${(props) => props.height};
  background: ${(props) => props.background};
  width: ${(props) => props.width};
`;

const Plot = styled.div`
  white-space: nowrap;
  overflow: hidden;
  width: 800px;
  outline: 1px dashed #0c0;
`;

export const WorkoutPlot: React.FC<{}> = () => {
  return (
    <Plot>
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
    </Plot>
  );
}

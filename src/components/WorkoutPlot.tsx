import React from "react";
import styled from "styled-components";
import { Interval, Intensity, Duration, totalDuration, intensityToZoneIndex, maximumIntensity } from "make-workout";
import { BarProps, Bar } from "./Bar";

const toBarProps = (interval: Interval, workoutDuration: Duration, maxIntensity: Intensity): BarProps => ({
  zone: intensityToZoneIndex(interval.intensity),
  width: `${interval.duration.seconds / workoutDuration.seconds * 100 - 0.1}%`,
  height: `${interval.intensity.value / maxIntensity.value * 100}%`,
});

const Plot = styled.div`
  white-space: nowrap;
  overflow: hidden;
  width: 800px;
  height: 200px;
  background: rgba(0,0,0, 0.03);
  border-radius: 5px;
  padding: 5px;
  margin: 10px 0;
`;

export const WorkoutPlot: React.FC<{ intervals: Interval[] }> = ({ intervals }) => {
  const workoutDuration = totalDuration(intervals);
  const maxIntensity = maximumIntensity(intervals);

  return (
    <Plot>
      { intervals.map((interval) => toBarProps(interval, workoutDuration, maxIntensity)).map((props) => (<Bar {...props} />)) }
    </Plot>
  );
}

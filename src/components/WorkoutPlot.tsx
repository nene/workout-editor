import React from "react";
import styled from "styled-components";
import { Interval, Intensity, Duration, totalDuration, maximumIntensity } from "make-workout";
import { BarProps, Bar } from "./Bar";

const toBarProps = (interval: Interval, workoutDuration: Duration, maxIntensity: Intensity): BarProps => ({
  zone: interval.intensity.zone,
  durationPercentage: interval.duration.seconds / workoutDuration.seconds * 100,
  intensityPercentage: interval.intensity.value / maxIntensity.value * 100,
});

const Plot = styled.div`
  white-space: nowrap;
  overflow: hidden;
  height: 200px;
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

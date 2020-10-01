import React from "react";
import styled from "styled-components";
import { Interval, Intensity, IntensityRange, FreeIntensity, Duration, totalDuration } from "make-workout";

type BarProps = {
  width: string;
  height: string;
  background: string;
};

const Bar = styled.div<BarProps>`
  display: inline-block;
  border-radius: 10px;
  margin-right: 0.1%;
  vertical-align: bottom;
  height: ${(props) => props.height};
  background: ${(props) => props.background};
  width: ${(props) => props.width};
  transition: width 0.1s, height 0.1s, background-color 0.1s;
`;

const zoneColor = (intensity: Intensity | IntensityRange | FreeIntensity): string => {
  if (intensity.value >= 1.18) {
    return "#ff330c";
  }
  if (intensity.value >= 1.05) {
    return "#ff6639";
  }
  if (intensity.value >= 0.90) {
    return "#ffcc3f";
  }
  if (intensity.value >= 0.75) {
    return "#59bf59";
  }
  if (intensity.value >= 0.60) {
    return "#338cff";
  }
  return "#7f7f7f";
}

const toBarProps = (interval: Interval, workoutDuration: Duration, maxIntensity: Intensity): BarProps => ({
  background: zoneColor(interval.intensity),
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

const maximumIntensity = (intervals: Interval[]): Intensity =>
  new Intensity(Math.max(...intervals.map(interval => Math.max(interval.intensity.start, interval.intensity.end))));

export const WorkoutPlot: React.FC<{ intervals: Interval[] }> = ({ intervals }) => {
  const workoutDuration = totalDuration(intervals);
  const maxIntensity = maximumIntensity(intervals);

  return (
    <Plot>
      { intervals.map((interval) => toBarProps(interval, workoutDuration, maxIntensity)).map((props) => (<Bar {...props} />)) }
    </Plot>
  );
}

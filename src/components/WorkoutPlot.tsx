import React from "react";
import styled from "styled-components";
import { Interval, Intensity, ConstantIntensity, Duration, totalDuration, ZoneIndex, intensityToZoneIndex } from "make-workout";

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

const zoneColorsMap: Record<ZoneIndex, string> = {
  0: "#7f7f7f",
  1: "#338cff",
  2: "#59bf59",
  3: "#ffcc3f",
  4: "#ff6639",
  5: "#ff330c",
}

const toBarProps = (interval: Interval, workoutDuration: Duration, maxIntensity: Intensity): BarProps => ({
  background: zoneColorsMap[intensityToZoneIndex(interval.intensity)],
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

const maximumIntensity = (intervals: Interval[]): ConstantIntensity =>
  new ConstantIntensity(Math.max(...intervals.map(interval => Math.max(interval.intensity.start, interval.intensity.end))));

export const WorkoutPlot: React.FC<{ intervals: Interval[] }> = ({ intervals }) => {
  const workoutDuration = totalDuration(intervals);
  const maxIntensity = maximumIntensity(intervals);

  return (
    <Plot>
      { intervals.map((interval) => toBarProps(interval, workoutDuration, maxIntensity)).map((props) => (<Bar {...props} />)) }
    </Plot>
  );
}

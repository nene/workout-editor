import React from "react";
import styled from "styled-components";
import {
  Interval,
  Intensity,
  Duration,
  totalDuration,
  maximumIntensity,
  RangeIntensity,
  intensityValueToZoneType,
} from "zwiftout";
import { BarProps, Bar, RangeBar, RangeBarProps } from "./Bar";

const toBarProps = (interval: Interval, workoutDuration: Duration, maxIntensity: Intensity): BarProps => ({
  zone: interval.intensity.zone,
  durationPercentage: (interval.duration.seconds / workoutDuration.seconds) * 100,
  intensityPercentage: (interval.intensity.value / maxIntensity.value) * 100,
});

const Plot = styled.div`
  white-space: nowrap;
  overflow: hidden;
  height: 200px;
  border-radius: 5px;
  padding: 5px;
  margin: 10px 0;
`;

const toRangeBarProps = (interval: Interval, workoutDuration: Duration, maxIntensity: Intensity): RangeBarProps => ({
  startZone: intensityValueToZoneType(interval.intensity.start),
  endZone: intensityValueToZoneType(interval.intensity.end),
  durationPercentage: (interval.duration.seconds / workoutDuration.seconds) * 100,
  intensityStartPercentage: (interval.intensity.start / maxIntensity.value) * 100,
  intensityEndPercentage: (interval.intensity.end / maxIntensity.value) * 100,
});

export const WorkoutPlot: React.FC<{ intervals: Interval[] }> = ({ intervals }) => {
  const workoutDuration = totalDuration(intervals);
  const maxIntensity = maximumIntensity(intervals);

  return (
    <Plot>
      {intervals.map((interval, i) => {
        if (interval.intensity instanceof RangeIntensity) {
          return <RangeBar key={i} {...toRangeBarProps(interval, workoutDuration, maxIntensity)} />;
        } else {
          return <Bar key={i} {...toBarProps(interval, workoutDuration, maxIntensity)} />;
        }
      })}
    </Plot>
  );
};

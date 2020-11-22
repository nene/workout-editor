import React from "react";
import styled from "styled-components";
import { ZoneType } from "zwiftout";

export type BarProps = {
  // Percentage of total workout length
  durationPercentage: number;
  // Percentage of maximum intensity in workout
  intensityPercentage: number;
  zone: ZoneType;
};

const zoneColorsMap: Record<ZoneType, string> = {
  free: "linear-gradient(to top, rgba(204,204,204,1), rgba(255,255,255,0))",
  Z1: "#7f7f7f",
  Z2: "#338cff",
  Z3: "#59bf59",
  Z4: "#ffcc3f",
  Z5: "#ff6639",
  Z6: "#ff330c",
};

export const Bar = styled.div<BarProps>`
  display: inline-block;
  border-radius: 10px;
  vertical-align: bottom;
  margin-right: 0.1%;
  /* exclude 0.1% margin from bar width */
  width: ${(props) => props.durationPercentage - 0.1}%;
  height: ${(props) => (props.zone === "free" ? 100 : props.intensityPercentage)}%;
  background: ${(props) => zoneColorsMap[props.zone]};
  transition: width 0.1s, height 0.1s, background-color 0.1s;
`;

export type RangeBarProps = {
  startZone: ZoneType;
  endZone: ZoneType;
  // Percentage of total workout length
  durationPercentage: number;
  // Percentage of maximum intensity in workout
  intensityStartPercentage: number;
  intensityEndPercentage: number;
};

const createUpPolygon = (middle: number) => `polygon(0% 100%, 100% 100%, 100% 0%, 0% ${middle}%)`;
const createDownPolygon = (middle: number) => `polygon(0% 0%, 0% 100%, 100% 100%, 100% ${middle}%)`;

export const RangeContainer = styled.div<{
  height: number;
  width: number;
  startZone: ZoneType;
  endZone: ZoneType;
  middle: number;
  direction: "up" | "down";
}>`
  display: inline-block;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  vertical-align: bottom;
  margin-right: 0.1%;
  /* exclude 0.1% margin from bar width */
  width: ${(props) => props.width - 0.1}%;
  height: ${(props) => props.height}%;
  clip-path: ${({ direction, middle }) => (direction === "up" ? createUpPolygon(middle) : createDownPolygon(middle))};
  background: linear-gradient(
    to right,
    ${(props) => zoneColorsMap[props.startZone]},
    ${(props) => zoneColorsMap[props.endZone]}
  );
  transition: width 0.1s, height 0.1s, background-color 0.1s;
`;

export const RangeBar: React.FC<RangeBarProps> = (props) => {
  const minHeightPercentage = Math.min(props.intensityStartPercentage, props.intensityEndPercentage);
  const maxHeightPercentage = Math.max(props.intensityStartPercentage, props.intensityEndPercentage);
  const bottomHeight = (minHeightPercentage / maxHeightPercentage) * 100;
  const topHeight = 100 - bottomHeight;
  const direction = props.intensityStartPercentage < props.intensityEndPercentage ? "up" : "down";

  return (
    <RangeContainer
      height={maxHeightPercentage}
      width={props.durationPercentage}
      middle={topHeight}
      direction={direction}
      startZone={props.startZone}
      endZone={props.endZone}
    />
  );
};

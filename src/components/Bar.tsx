import styled from "styled-components";
import { ZoneType } from "zwiftout";

type BaseBarProps = {
  // Percentage of total workout length
  durationPercentage: number;
};

const BaseBar = styled.div<BaseBarProps>`
  display: inline-block;
  vertical-align: bottom;
  margin-right: 0.1%;
  /* exclude 0.1% margin from bar width */
  width: ${(props) => props.durationPercentage - 0.1}%;
  transition: width 0.1s, height 0.1s, background-color 0.1s;
`;

export type BarProps = BaseBarProps & {
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

export const Bar = styled(BaseBar)<BarProps>`
  border-radius: 10px;
  height: ${(props) => (props.zone === "free" ? 100 : props.intensityPercentage)}%;
  background: ${(props) => zoneColorsMap[props.zone]};
`;

export type RangeBarProps = BaseBarProps & {
  // Percentage of maximum intensity in workout
  maxIntensityPercentage: number;
  // Percentage relative to `maxIntensityPercentage`
  relativeMinIntensityPercentage: number;
  startZone: ZoneType;
  endZone: ZoneType;
  direction: "up" | "down";
};

const createUpPolygon = (middle: number) => `polygon(0% 100%, 100% 100%, 100% 0%, 0% ${middle}%)`;
const createDownPolygon = (middle: number) => `polygon(0% 0%, 0% 100%, 100% 100%, 100% ${middle}%)`;

export const RangeBar = styled(BaseBar)<RangeBarProps>`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  height: ${(props) => props.maxIntensityPercentage}%;
  clip-path: ${({ direction, relativeMinIntensityPercentage }) =>
    direction === "up"
      ? createUpPolygon(relativeMinIntensityPercentage)
      : createDownPolygon(relativeMinIntensityPercentage)};
  background: linear-gradient(
    to right,
    ${(props) => zoneColorsMap[props.startZone]},
    ${(props) => zoneColorsMap[props.endZone]}
  );
`;

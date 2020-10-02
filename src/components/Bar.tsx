import styled from "styled-components";
import { ZoneIndex } from "make-workout";

export type BarProps = {
  // Percentage of total workout length
  durationPercentage: number;
  // Percentage of maximum intensity in workout
  intensityPercentage: number;
  zone: ZoneIndex;
};

const zoneColorsMap: Record<ZoneIndex, string> = {
  0: "#7f7f7f",
  1: "#338cff",
  2: "#59bf59",
  3: "#ffcc3f",
  4: "#ff6639",
  5: "#ff330c",
}

export const Bar = styled.div<BarProps>`
  display: inline-block;
  border-radius: 10px;
  vertical-align: bottom;
  margin-right: 0.1%;
  /* exclude 0.1% margin from bar width */
  width: ${(props) => props.durationPercentage - 0.1}%;
  height: ${(props) => props.intensityPercentage}%;
  background: ${(props) => zoneColorsMap[props.zone]};
  transition: width 0.1s, height 0.1s, background-color 0.1s;
`;

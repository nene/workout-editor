import styled from "styled-components";
import { ZoneIndex } from "make-workout";

export type BarProps = {
  width: string;
  height: string;
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
  margin-right: 0.1%;
  vertical-align: bottom;
  height: ${(props) => props.height};
  background: ${(props) => zoneColorsMap[props.zone]};
  width: ${(props) => props.width};
  transition: width 0.1s, height 0.1s, background-color 0.1s;
`;

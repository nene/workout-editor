import styled from "styled-components";

export type BarProps = {
  width: string;
  height: string;
  background: string;
};

export const Bar = styled.div<BarProps>`
  display: inline-block;
  border-radius: 10px;
  margin-right: 0.1%;
  vertical-align: bottom;
  height: ${(props) => props.height};
  background: ${(props) => props.background};
  width: ${(props) => props.width};
  transition: width 0.1s, height 0.1s, background-color 0.1s;
`;

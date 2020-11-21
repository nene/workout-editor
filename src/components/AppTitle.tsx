import React from "react";
import styled from "styled-components";
import logo from "../logo.png";

const Title = styled.h1`
  font-weight: normal;
`;

const Logo = styled.img.attrs({ src: logo, width: 45, height: 45 })`
  margin-right: 0.5em;
  vertical-align: bottom;
`;

const Beta = styled.span`
  display: inline-block;
  color: #cc2222;
  opacity: 0.7;
  font-size: 20px;
  font-weight: bold;
  transform: rotate(20deg) translate(-15px, -8px);
`;

export const AppTitle: React.FC<{}> = () => (
  <Title>
    <Logo />
    Workout editor <Beta>beta</Beta>
  </Title>
);

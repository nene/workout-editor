import React, { useState } from "react";
import { Workout, generateZwo } from "zwiftout";
import styled from "styled-components";
import { DownloadButton } from "./DownloadButton";

const Header = styled.h2`
  font-weight: normal;
  font-size: 16px;
`;

const ZwoCode = styled.pre`
  border: 1px solid #bbb;
  border-radius: 3px;
  padding: 10px;
`;

const ShowHideButton = styled.button`
  border: 1px solid #bbb;
  border-radius: 3px;
  padding: 3px 8px;
  float: right;
`;

export const ZwoOutput: React.FC<{ workout: Workout }> = ({ workout }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <Header>
        Generated Zwift workout file (.zwo):
        <DownloadButton workout={workout} />
      </Header>
      <ZwoCode>
        <ShowHideButton onClick={() => setExpanded(!expanded)}>{expanded ? "Hide ZWO" : "Show ZWO"}</ShowHideButton>
        {expanded ? generateZwo(workout) : ""}
      </ZwoCode>
    </div>
  );
};

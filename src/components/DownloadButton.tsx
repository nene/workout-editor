import React from "react";
import { Workout, generateZwo } from "zwiftout";
import styled from "styled-components";

const Button = styled.a`
  border: 1px solid #bbb;
  border-radius: 3px;
  padding: 3px 8px;
  margin-left: 16px;
  font-size: 14px;
  color: inherit;
  text-decoration: none;
  background-color: #eee;
  &:hover {
    background-color: #86af1c;
    border-color: #86af1c;
  }
`;

// Creates .zwo file name from workout name
const workoutFileName = (name: string): string => name.replace(/[^\w]/, "-").replace(/-+/, "-").toLowerCase() + ".zwo";

const downloadDataUrl = (xml: string): string => URL.createObjectURL(new Blob([xml], { type: "application/xml" }));

export const DownloadButton: React.FC<{ workout: Workout }> = ({ workout }) => {
  return (
    <Button download={workoutFileName(workout.name)} href={downloadDataUrl(generateZwo(workout))}>
      Download
    </Button>
  );
};

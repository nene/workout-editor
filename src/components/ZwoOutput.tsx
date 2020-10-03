import React from 'react';
import { Workout, generateZwo } from 'make-workout';
import styled from 'styled-components';

const Header = styled.h2`
  font-weight: normal;
  font-size: 16px;
`;

const ZwoCode = styled.pre`
  border: 1px solid #bbb;
  border-radius: 3px;
  padding: 10px;
`;

export const ZwoOutput: React.FC<{ workout: Workout }> = ({ workout }) => {
  return (
    <div>
      <Header>Generated Zwift workout file (.zwo):</Header>
      <ZwoCode>{generateZwo(workout)}</ZwoCode>
    </div>
  )
};

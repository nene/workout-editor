import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  font-size: 12px;
  text-align: center;
  margin-top: 3em;
  border-top: 1px solid #eee;
  padding-top: 1em;
  color: gray;
`;

export const Credits: React.FC<{}> = () => (
  <Text>
    Built by Rene Saarsoo.
    ·
    Graphics inspired by <a href="https://whatsonzwift.com/workouts/">What's on Zwift?</a>
    &nbsp;·
    Sweat provided by <a href="https://zwift.com">Zwift</a> :-)
  </Text>
)
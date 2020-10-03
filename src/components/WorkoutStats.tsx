import React from 'react';
import { stats, Workout, Intensity } from 'make-workout';
import { formatDuration } from './formatDuration';
import styled from 'styled-components';

const formatIntensity = (intensity: Intensity): string => `${Math.round(intensity.value * 100)}%`;

const StatsLine: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
  <li><strong>{label}</strong> {value}</li>
);

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  border: 1px solid #bbb;
  border-radius: 10px;
  padding: 10px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.6);
`;
const Section = styled.section``;

const Header = styled.h2`
  margin: 0;
  font-size: 14px;
  font-weight: normal;
`;
const List = styled.ul`
  margin: 1m 0;
  padding: 0;
  list-style: none;
`;
const ZoneList = styled(List)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;


export const WorkoutStats: React.FC<{workout: Workout}> = ({ workout }) => {
  const {totalDuration, averageIntensity, normalizedIntensity, tss, zones} = stats(workout);
  
  return (
    <Container>
      <Section>
        <Header>Summary</Header>
        <List>
          <StatsLine label="Duration:" value={formatDuration(totalDuration)} />
          <StatsLine label="Average intensity:" value={formatIntensity(averageIntensity)} />
          <StatsLine label="Normalized intensity:" value={formatIntensity(normalizedIntensity)} />
          <StatsLine label="TSS:" value={Math.round(tss)} />
        </List>
      </Section>
      <Section>
        <Header>Zone distribution</Header>
        <ZoneList>
          {zones.map(zone => (<StatsLine label={zone.name} value={formatDuration(zone.duration)} />)) }
        </ZoneList>
      </Section>
    </Container>
  )
};

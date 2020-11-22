import React from "react";
import { stats, Workout, Intensity } from "zwiftout";
import { formatDuration } from "./formatDuration";
import styled from "styled-components";

const formatIntensity = (intensity: Intensity): string => `${Math.round(intensity.value * 100)}%`;

type StatsProps = { label: string; value: string | number };

const StatsLine: React.FC<StatsProps> = ({ label, value }) => (
  <>
    <strong>{label}</strong> {value}
  </>
);

const StatsListItem: React.FC<StatsProps> = (props) => (
  <li>
    <StatsLine {...props} />
  </li>
);

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-areas:
    "summary  zones"
    "xp       xp   ";
  border: 1px solid #bbb;
  border-radius: 10px;
  padding: 10px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.6);
`;
const SummarySection = styled.section`
  grid-area: summary;
`;
const ZonesSection = styled.section`
  grid-area: zones;
`;
const XpSection = styled.section`
  grid-area: xp;
`;

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

export const WorkoutStats: React.FC<{ workout: Workout }> = ({ workout }) => {
  const { totalDuration, averageIntensity, normalizedIntensity, tss, xp, zones } = stats(workout);

  return (
    <Container>
      <SummarySection>
        <Header>Summary</Header>
        <List>
          <StatsListItem label="Duration:" value={formatDuration(totalDuration)} />
          <StatsListItem label="Average intensity:" value={formatIntensity(averageIntensity)} />
          <StatsListItem label="Normalized intensity:" value={formatIntensity(normalizedIntensity)} />
          <StatsListItem label="TSS:" value={Math.round(tss)} />
        </List>
      </SummarySection>
      <ZonesSection>
        <Header>Zone distribution</Header>
        <ZoneList>
          {zones.map((zone) => (
            <StatsListItem key={zone.name} label={zone.name} value={formatDuration(zone.duration)} />
          ))}
        </ZoneList>
      </ZonesSection>
      <XpSection>
        <StatsLine label="Zwift XP:" value={`${xp} (like riding ${Math.ceil(xp / 20)} km)`} />
      </XpSection>
    </Container>
  );
};

import React from 'react';
import { stats, Workout, Duration, Intensity } from 'make-workout';
import { Duration as LuxonDuration } from 'luxon';

const formatDuration = (duration: Duration): string => {
  const {hours, minutes, seconds} = LuxonDuration.fromObject({seconds: duration.seconds}).shiftTo('hours', 'minutes', 'seconds');
  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  else if (minutes > 0) {
    return `${minutes}min`;
  }
  else if (seconds > 0) {
    return `${seconds}sec`;
  }
  else {
    return `-`;
  }
};

const formatIntensity = (intensity: Intensity): string => `${Math.round(intensity.value * 100)}%`;

const StatsLine: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
  <li><strong>{label}</strong> {value}</li>
);

export const WorkoutStats: React.FC<{workout: Workout}> = ({ workout }) => {
  const {totalDuration, averageIntensity, normalizedIntensity, tss, zones} = stats(workout);
  
  return (
    <div>
      <h2>Summary</h2>
      <ul>
        <StatsLine label="Duration:" value={formatDuration(totalDuration)} />
        <StatsLine label="Average intensity:" value={formatIntensity(averageIntensity)} />
        <StatsLine label="Normalized intensity:" value={formatIntensity(normalizedIntensity)} />
        <StatsLine label="TSS:" value={Math.round(tss)} />
      </ul>
      <h2>Zone distribution</h2>
      <ul>
        {zones.map(zone => (<StatsLine label={zone.name} value={formatDuration(zone.duration)} />)) }
      </ul>
    </div>
  )
};

import React from 'react';
import { stats, Workout } from 'make-workout';

export const WorkoutStats: React.FC<{workout: Workout}> = ({ workout }) => (
  <pre>{stats(workout)}</pre>
);

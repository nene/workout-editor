import React from 'react';
import { WorkoutPlot } from './components/WorkoutPlot';

export function App() {
  return (
    <div>
      <h1>Workout editor</h1>
      <textarea rows={10} cols={100} />
      <WorkoutPlot />
    </div>
  );
}

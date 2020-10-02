import React, { useState, useCallback } from 'react';
import { WorkoutPlot } from './components/WorkoutPlot';
import { WorkoutStats } from './components/WorkoutStats';
import { parse, chunkRangeIntervals, Duration } from 'make-workout';
import { ErrorMessage } from './components/ErrorMessage';

const defaultWorkout = `Name: Hello

Warmup: 10:00 30%..60%
Interval: 20:00 100%
Rest: 10:00 75%
Interval: 20:00 100%
Rest: 10:00 75%
Cooldown: 10:00 60%..30%
`;

// Split range-intervals into 1 minute chunks
const chunkSize = new Duration(60);

export function App() {
  const [text, setText] = useState(defaultWorkout);
  const [workout, setWorkout] = useState(parse(defaultWorkout));
  const [error, setError] = useState<string | undefined>(undefined);

  const onChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setText(value);
    try {
      setWorkout(parse(value));
      setError(undefined);
    } catch (e) {
      setError(e.message);
    }
  }, [setText, setWorkout, setError]);
  
  return (
    <div>
      <h1>Workout editor</h1>
      <textarea rows={10} cols={100} onChange={onChange} value={text} />
      <WorkoutPlot intervals={chunkRangeIntervals(workout.intervals, chunkSize)} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <WorkoutStats workout={workout} />
    </div>
  );
}

import React, { useState, useCallback } from 'react';
import { WorkoutPlot } from './components/WorkoutPlot';
import { WorkoutStats } from './components/WorkoutStats';
import { parse } from 'make-workout';

const defaultWorkout = `Name: Hello

Rest: 10:00 75%
Interval: 20:00 100%
Rest: 10:00 75%
`;

export function App() {
  const [text, setText] = useState(defaultWorkout);
  const [workout, setWorkout] = useState(parse(defaultWorkout));
  const [error, setError] = useState("");

  const onChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setText(value);
    try {
      setWorkout(parse(value));
      setError("");
    } catch (e) {
      setError(e.message);
    }
  }, [setText, setWorkout, setError]);
  
  return (
    <div>
      <h1>Workout editor</h1>
      <textarea rows={10} cols={100} onChange={onChange} value={text} />
      <WorkoutPlot />
      <div>{error}</div>
      <WorkoutStats workout={workout} />
    </div>
  );
}

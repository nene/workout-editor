import React, { useState, useCallback } from 'react';
import { WorkoutPlot } from './components/WorkoutPlot';
import { parse, stats } from 'make-workout';

const defaultWorkout = `Name: Hello

Rest: 10:00 75%
Interval: 20:00 100%
Rest: 10:00 75%
`;

export function App() {
  const [text, setText] = useState(defaultWorkout);
  const [statsText, setStatsText] = useState(stats(parse(defaultWorkout)));

  const onChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setText(value);
    try {
      setStatsText(stats(parse(value)));
    } catch (e) {
      setStatsText(e.message);
    }
  }, [setText, setStatsText]);
  
  return (
    <div>
      <h1>Workout editor</h1>
      <textarea rows={10} cols={100} onChange={onChange} value={text} />
      <WorkoutPlot />
      <pre>{statsText}</pre>
    </div>
  );
}

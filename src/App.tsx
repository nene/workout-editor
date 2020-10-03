import React, { useState, useCallback } from 'react';
import { WorkoutPlot } from './components/WorkoutPlot';
import { WorkoutStats } from './components/WorkoutStats';
import { parse, chunkRangeIntervals, Duration } from 'make-workout';
import { ErrorMessage } from './components/ErrorMessage';
import styled from 'styled-components';
import { CodeEditor } from './components/CodeEditor';

const defaultWorkout = `Name: Hello

Warmup: 10:00 30%..60%
Interval: 20:00 100%
Rest: 10:00 75%
Interval: 20:00 100%
FreeRide: 10:00
Cooldown: 10:00 60%..30%
`;

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const AppTitle = styled.h1`
  font-weight: normal;
`;

// Split range-intervals into 1 minute chunks
const chunkSize = new Duration(60);

export function App() {
  const [text, setText] = useState(defaultWorkout);
  const [workout, setWorkout] = useState(parse(defaultWorkout));
  const [error, setError] = useState<string | undefined>(undefined);

  const onChange = useCallback((value: string) => {
    setText(value);
    try {
      setWorkout(parse(value));
      setError(undefined);
    } catch (e) {
      setError(e.message);
    }
  }, [setText, setWorkout, setError]);
  
  return (
    <AppContainer>
      <AppTitle>Workout editor</AppTitle>
      <CodeEditor onValueChange={onChange} value={text} />
      <WorkoutPlot intervals={chunkRangeIntervals(workout.intervals, chunkSize)} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <WorkoutStats workout={workout} />
    </AppContainer>
  );
}

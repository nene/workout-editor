import React, { useState, useCallback } from "react";
import { WorkoutPlot } from "./components/WorkoutPlot";
import { WorkoutStats } from "./components/WorkoutStats";
import { parse, ParseError, ValidationError, ZwiftoutException } from "zwiftout";
import { ErrorMessage } from "./components/ErrorMessage";
import styled from "styled-components";
import { CodeEditor } from "./components/CodeEditor";
import { ZwoOutput } from "./components/ZwoOutput";
import { AppTitle } from "./components/AppTitle";
import { Credits } from "./components/Credits";

const defaultWorkout = `Name: Sample workout
Description: Try changing it, and see what happens below.

Warmup: 10:00 30%..75%
Interval: 15:00 100% 90rpm
  @ 00:00 Start off easy
  @ 01:00 Settle into rhythm
  @ 07:30 Half way through
  @ 14:00 Final minute, stay strong!
Rest: 10:00 75%
FreeRide: 20:00
  @ 00:10 Just have some fun, riding as you wish
Cooldown: 10:00 70%..30%
`;

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export function App() {
  const [text, setText] = useState(defaultWorkout);
  const [workout, setWorkout] = useState(parse(defaultWorkout));
  const [error, setError] = useState<ZwiftoutException | undefined>(undefined);

  const onChange = useCallback(
    (value: string) => {
      setText(value);
      try {
        setWorkout(parse(value));
        setError(undefined);
      } catch (e) {
        if (e instanceof ParseError || e instanceof ValidationError) {
          setError(e);
        } else {
          throw e;
        }
      }
    },
    [setText, setWorkout, setError],
  );

  return (
    <AppContainer>
      <AppTitle />
      <CodeEditor onValueChange={onChange} value={text} error={error} />
      <WorkoutPlot intervals={workout.intervals} />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <WorkoutStats workout={workout} />
      <ZwoOutput workout={workout} />
      <Credits />
    </AppContainer>
  );
}

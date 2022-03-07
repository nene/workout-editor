import React, { useState, useCallback, useEffect } from "react";
import { WorkoutPlot } from "./components/WorkoutPlot";
import { WorkoutStats } from "./components/WorkoutStats";
import { parse, ParseError, ValidationError, ZwiftoutException } from "zwiftout";
import { ErrorMessage } from "./components/ErrorMessage";
import styled from "styled-components";
import { CodeEditor } from "./components/CodeEditor";
import { ZwoOutput } from "./components/ZwoOutput";
import { AppTitle } from "./components/AppTitle";
import { Credits } from "./components/Credits";
import { loadWorkout, saveWorkout } from "./storage";

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export function App() {
  const [loaded, setLoaded] = useState(false);
  const [text, setText] = useState("");
  const [workout, setWorkout] = useState(parse(""));
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

  useEffect(() => {
    if (loaded) {
      saveWorkout(text);
    } else {
      setLoaded(true);
      onChange(loadWorkout());
    }
  }, [text, onChange, setLoaded, loaded]);

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

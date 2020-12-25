import React, { useCallback } from "react";
import Editor from "react-simple-code-editor";
import styled from "styled-components";
import { ZwiftoutException } from "zwiftout";

const highlight = (code: string): string => {
  return code
    .replace(/^(Name|Author|Description|Warmup|Rest|Interval|Cooldown|FreeRide):/gm, "<code class='keyword'>$&</code>")
    .replace(/-?(\d{1,2}:)?\d{1,2}:\d{1,2}/g, "<code class='duration'>$&</code>")
    .replace(/\d+%/g, "<code class='intensity'>$&</code>")
    .replace(/\d+rpm/g, "<code class='cadence'>$&</code>")
    .replace(/\.\./g, "<code class='range'>$&</code>")
    .replace(/@(.*?)$/gm, "<code class='comment-start'>@</code><code class='comment'>$1</code>");
};

export const BaseCodeEditor = styled(Editor).attrs({ padding: 10 })`
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  font-size: 14px;
  line-height: 1.3;
  border: 1px inset #bbb;
  border-radius: 3px;
  background: #fff;

  code.keyword {
    font-weight: bold;
  }
  code.duration {
    color: #681caf;
  }
  code.intensity {
    color: #af391c;
  }
  code.cadence {
    color: #86af1c;
  }
  code.range {
    color: #888;
  }
  code.comment {
    font-style: italic;
    color: #888;
    .duration {
      color: #8d67af;
    }
  }
  code.comment-start {
    font-weight: bold;
    font-style: italic;
    color: #888;
  }
  code.error {
    background-color: rgba(252, 152, 152, 0.5);
    border-radius: 4px;
  }
`;

const highlightErrorLine = (code: string, linenr: number): string => {
  const regex = new RegExp(`^((?:[^\\n]*?\\n){${linenr}})([^\\n]*?)\\n`);
  return code.replace(regex, "$1<code class='error'>$2</code>\n");
};

interface CodeEditorProps {
  value: string;
  onValueChange: (value: string) => void;
  error: ZwiftoutException | undefined;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ value, onValueChange, error }) => {
  const highlightFn = useCallback((code: string) => highlight(error ? highlightErrorLine(code, error.loc.row) : code), [
    error,
  ]);
  return <BaseCodeEditor value={value} onValueChange={onValueChange} highlight={highlightFn} />;
};

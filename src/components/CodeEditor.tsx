import Editor from "react-simple-code-editor";
import styled from "styled-components";

const highlight = (code: string): string => {
  return code
    .replace(/^(Name|Author|Description|Warmup|Rest|Interval|Cooldown|FreeRide):/gm, "<code class='keyword'>$&</code>")
    .replace(/(\d{1,2}:)?\d{1,2}:\d{1,2}/g, "<code class='duration'>$&</code>")
    .replace(/\d+%/g, "<code class='intensity'>$&</code>")
    .replace(/\d+rpm/g, "<code class='cadence'>$&</code>")
    .replace(/\.\./g, "<code class='range'>$&</code>")
    .replace(/@(.*?)$/gm, "<code class='comment-start'>@</code><code class='comment'>$1</code>");
};

export const CodeEditor = styled(Editor).attrs({ padding: 10, highlight })`
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
`;

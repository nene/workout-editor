import Editor from 'react-simple-code-editor';
import styled from 'styled-components';

export const CodeEditor = styled(Editor).attrs({ padding: 10, highlight: code => code })`
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.3;
  border: 1px inset #bbb;
  border-radius: 3px;
  background: #fff;
`;

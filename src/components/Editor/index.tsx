import { useMemo, useRef } from "react";
import "./styles.css";

interface Props {
  source: string;
  formattedSource?: string;
  setSource(source: string): void;
}

const LINE_BREAK_REGEX = /\n/g;

const countLines = (source: string) => {
  return (source.match(LINE_BREAK_REGEX)?.length ?? 0) + 1;
};

const makeLinesBarLines = (source: string) => {
  return new Array(countLines(source))
    .fill(0)
    .map((_, idx) => idx + 1)
    .join("\n");
};

const Editor: React.FC<Props> = (props) => {
  const { source, formattedSource, setSource } = props;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const backgroundRef = useRef<HTMLElement>(null);
  const linesBarRef = useRef<HTMLElement>(null);
  const linesBarContent = useMemo(() => makeLinesBarLines(source), [source]);

  // console.log("source: ", JSON.stringify(source) ?? "");
  // console.log("formattedSource: ", JSON.stringify(formattedSource) ?? "");

  const onInputScroll = () => {
    if (!(inputRef.current && backgroundRef.current && linesBarRef.current))
      return;

    backgroundRef.current.scrollTop = inputRef.current.scrollTop;
    linesBarRef.current.scrollTop = inputRef.current.scrollTop;
  };

  return (
    <section className="input-container">
      <span ref={linesBarRef} className="lines-bar">
        {linesBarContent}
      </span>
      <article
        ref={backgroundRef}
        dangerouslySetInnerHTML={{ __html: formattedSource ?? source }}
        className="input-background"
      ></article>
      <textarea
        ref={inputRef}
        onScroll={onInputScroll}
        className="input"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
    </section>
  );
};

export default Editor;

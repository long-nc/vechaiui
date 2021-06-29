import * as React from "react";

import useShiki from "@libs/react-shiki";

import { ClipBoardButton } from "./clip-board-button";
import s from "./code.module.css";

export function Highlight({
  code,
  language,
  lineNumber,
  showClipBoard,
}: any) {
  const { tokens, getLineProps, getTokenProps } = useShiki({
    code,
    language,
  });

  return (
    <div className="relative w-full h-full group dark">
      <code
        className={`relative dark language-${language}`}
        style={{
          fontFamily: "inherit",
          fontSize: "inherit",
          whiteSpace: "inherit",
          wordBreak: "inherit",
          overflowWrap: "inherit",
          lineHeight: "inherit",
        }}
      >
        <div className="flex flex-col">
          {tokens.map((line: any, i: number) => {
            if (i === tokens.length - 1 && line.length === 0) return null;

            return (
              <span
                key={i}
                {...getLineProps({
                  line,
                  key: i,
                  className: lineNumber ? s.lineNumber : "",
                  // className: s.lineNumber,
                })}
              >
                {line.length === 0 && <span>&#8203;</span>}
                {line.map((token: any, key: number) => (
                  <span
                    key={key}
                    {...getTokenProps({
                      token,
                      key,
                    })}
                  />
                ))}
              </span>
            );
          })}
        </div>
      </code>
      {showClipBoard && <ClipBoardButton />}
    </div>
  );
}
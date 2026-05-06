import { Fragment, type ReactNode } from "react";

/**
 * Renders a string with `*…*` segments wrapped in <em>.
 * Lets us keep poetic copy in plain strings inside data files.
 *
 * `breakBefore` — when true, inserts a <br /> before each <em> segment
 * (used in collection intro paragraphs to separate the italic phrase).
 */
export default function Emphasis({
  text,
  breakBefore = false,
}: {
  text: string;
  breakBefore?: boolean;
}): ReactNode {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <Fragment key={i}>
              {breakBefore && <br />}
              <em>{part.slice(1, -1)}</em>
            </Fragment>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

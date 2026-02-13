import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useRef } from "react";
import { activeTabIdAtom, textFamily } from "~/atoms";
import "./TextArea.scss";

const placeholder = `Type here...`.trim();

export const TextArea = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const selectionRef = useRef<number | null>(null);
  const activeTabId = useAtomValue(activeTabIdAtom);
  const [text, setText] = useAtom(textFamily(activeTabId));

  const handleTextChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback(
      (e) => {
        let nextValue = e.target.value;
        const selectionStart = e.target.selectionStart;
        const lineStart =
          e.target.value.lastIndexOf("\n", e.target.selectionStart - 1) + 1;
        let lineEnd = e.target.value.indexOf("\n", selectionStart);
        lineEnd = lineEnd === -1 ? e.target.value.length : lineEnd;
        const line = e.target.value.slice(lineStart, lineEnd);
        if (line.startsWith("- ")) {
          const newValue =
            e.target.value.slice(0, lineStart) +
            " • " +
            line.slice(2) +
            e.target.value.slice(lineEnd);
          nextValue = newValue;
          selectionRef.current = selectionStart + 1;
        }

        setText(nextValue);
      },
      [setText]
    );

  useEffect(() => {
    if (selectionRef.current !== null && ref.current) {
      ref.current.selectionStart = selectionRef.current;
      ref.current.selectionEnd = selectionRef.current;
      selectionRef.current = null;
    }
  }, [text]);

  useEffect(() => {
    ref.current?.focus();
  }, [activeTabId]);

  return (
    <textarea
      ref={ref}
      className="main-text-area"
      value={text}
      onChange={handleTextChange}
      placeholder={placeholder}
      autoFocus
    />
  );
};

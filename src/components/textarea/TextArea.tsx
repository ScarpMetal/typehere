import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useRef } from "react";
import { activeTabIdAtom, textFamily } from "~/atoms";
import "./TextArea.scss";

const placeholder = `Type here...`.trim();

export const TextArea = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const activeTabId = useAtomValue(activeTabIdAtom);
  const [text, setText] = useAtom(textFamily(activeTabId));

  const handleTextChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback(
      (e) => {
        setText(e.target.value);
      },
      [setText]
    );

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

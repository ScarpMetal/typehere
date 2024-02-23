import { useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";
import { activeTabIdAtom, textFamily } from "~/atoms";
import "./TextArea.scss";

export const TextArea = () => {
  const activeTabId = useAtomValue(activeTabIdAtom);
  const [text, setText] = useAtom(textFamily(activeTabId));

  const handleTextChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback(
      (e) => {
        setText(e.target.value);
      },
      [setText]
    );

  return (
    <textarea
      className="main-text-area"
      value={text}
      onChange={handleTextChange}
      autoFocus
    />
  );
};

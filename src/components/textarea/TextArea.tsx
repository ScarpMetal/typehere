import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useRef } from "react";
import { activeTabIdAtom, textFamily } from "~/atoms";
import "./TextArea.scss";

const placeholder = `
How to use:
- Type anywhere below the tabs.
- Click the tabs above to switch between notes.
- Click the "+" icon (at the end of the tab list) to create a new note. 
- Right click a tab and click "Delete" to delete a note.

Note: All notes are stored in local storage (no cloud storage), so be careful what you save here.
`.trim();

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

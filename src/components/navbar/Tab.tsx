import { useAtom, useAtomValue } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { activeTabIdAtom, textFamily } from "~/atoms";
import { TabContextMenu } from "./TabContextMenu";

export interface TabProps {
  tabId: string;
}

export const Tab = ({ tabId }: TabProps) => {
  const [activeTabId, setActiveTabId] = useAtom(activeTabIdAtom);
  const [contextMenuPos, setContextMenuPos] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const isActive = tabId === activeTabId;
  const text = useAtomValue(textFamily(tabId));
  const isNewTab = !text.length;

  const tabDisplay = useMemo(() => {
    if (isNewTab) return "New Tab";
    const [firstLine] = text.split("\n");
    if (!firstLine) return "New Tab";
    const displayLength = 25;
    let formatted = firstLine.slice(0, displayLength);
    if (firstLine.length > displayLength) {
      formatted += "...";
    }
    return formatted;
  }, [isNewTab, text]);

  const handleNavigateToTab = useCallback(() => {
    setActiveTabId(tabId);
  }, [setActiveTabId, tabId]);

  const handleOpenContextMenu: React.MouseEventHandler<HTMLButtonElement> =
    useCallback((e) => {
      e.preventDefault();
      setContextMenuPos({ left: e.clientX, top: e.clientY });
    }, []);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenuPos(null);
  }, []);

  return (
    <>
      <button
        type="button"
        className="tab"
        data-active={isActive}
        data-new-tab={isNewTab}
        onClick={handleNavigateToTab}
        onContextMenu={handleOpenContextMenu}
      >
        {tabDisplay}
      </button>
      {contextMenuPos && (
        <TabContextMenu
          tabId={tabId}
          pos={contextMenuPos}
          onClose={handleCloseContextMenu}
        />
      )}
    </>
  );
};

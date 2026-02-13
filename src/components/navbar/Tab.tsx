import { logEvent } from "firebase/analytics";
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { activeTabIdAtom, tabIdsAtom, textFamily } from "~/atoms";
import { ConfirmModal } from "~/components/ConfirmModal/ConfirmModal";
import { analytics } from "~/firebase";
import { useFullReset } from "~/useFullReset";

export interface TabProps {
  tabId: string;
}

export const Tab = ({ tabId }: TabProps) => {
  const fullReset = useFullReset();
  const [tabIds, setTabIds] = useAtom(tabIdsAtom);
  const [activeTabId, setActiveTabId] = useAtom(activeTabIdAtom);
  const isActive = tabId === activeTabId;
  const text = useAtomValue(textFamily(tabId));
  const isNewTab = !text.length;
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const tabDisplay = useMemo(() => {
    if (isNewTab) return "New Tab";
    const [firstLineUntrimmed] = text.split("\n");
    const firstLine = firstLineUntrimmed.trim();
    if (!firstLine?.length) return "New Tab";
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

  const performDeleteTab = useCallback(() => {
    if (isActive) {
      const activeTabIndex = tabIds.findIndex((tid) => tid === tabId);
      const nextTabIds = [...tabIds];
      // Remove tab from tab ids array
      nextTabIds.splice(activeTabIndex, 1);
      setTabIds(nextTabIds);

      // Remove tab text from tab family
      textFamily.remove(tabId);

      // Next active tab id to take if available: Next -> Prev -> Default
      const nextActiveTabId =
        nextTabIds[activeTabIndex] || nextTabIds[activeTabIndex - 1];
      if (!nextActiveTabId) {
        fullReset();
      } else {
        setActiveTabId(nextActiveTabId);
      }
    } else {
      // Remove tab from tab ids array
      setTabIds((prev) => prev.filter((tid) => tid !== tabId));

      // Remove tab text from tab family
      textFamily.remove(tabId);
    }
    logEvent(analytics, "remove_tab");
  }, [fullReset, isActive, setActiveTabId, setTabIds, tabId, tabIds]);

  const handleDeleteTab = useCallback(() => {
    if (isNewTab === false) {
      setConfirmDeleteOpen(true);
      return;
    }
    performDeleteTab();
  }, [isNewTab, performDeleteTab]);

  return (
    <>
      <div className="tab-container">
        <button
          type="button"
          className="tab navbar-button"
          data-active={isActive}
          data-new-tab={isNewTab}
          onClick={handleNavigateToTab}
        >
          {tabDisplay}
        </button>
        <button
          type="button"
          className="close-tab navbar-button"
          onClick={handleDeleteTab}
        >
          x
        </button>
      </div>
      <ConfirmModal
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        title="Delete this note?"
        description="Are you sure you want to delete this note? Your content cannot be recovered."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={performDeleteTab}
        variant="danger"
      />
    </>
  );
};

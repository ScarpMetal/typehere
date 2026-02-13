import { useAtom, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { activeTabIdAtom, tabIdsAtom } from "~/atoms";
import { useFullReset } from "~/useFullReset";
import "./Navbar.scss";
import { Tab } from "./Tab";
import { logEvent } from "firebase/analytics";
import { analytics } from "~/firebase";

export const Navbar = () => {
  const fullReset = useFullReset();
  const [tabIds, setTabIds] = useAtom(tabIdsAtom);
  const setActiveTabId = useSetAtom(activeTabIdAtom);

  const handleAddTab = useCallback(() => {
    const newTabId = `ID-${Math.random()}`;
    setTabIds((prev) => [...prev, newTabId]);
    setActiveTabId(newTabId);
    logEvent(analytics, "add_tab");
  }, [setActiveTabId, setTabIds]);

  // Guarantee there is an active tab
  useEffect(() => {
    if (!tabIds.length) {
      fullReset();
    }
  }, [fullReset, tabIds.length]);

  return (
    <div className="tabs">
      {tabIds.map((tabId) => (
        <Tab key={tabId} tabId={tabId} />
      ))}
      <button
        type="button"
        className="add-tab navbar-button"
        onClick={handleAddTab}
      >
        +
      </button>
    </div>
  );
};

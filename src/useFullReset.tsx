import { useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useCallback } from "react";
import {
  DEFAULT_TAB_ID,
  activeTabIdAtom,
  tabIdsAtom,
  textFamily,
} from "~/atoms";

export const useFullReset = () => {
  const setTabIds = useSetAtom(tabIdsAtom);
  const setActiveTabId = useSetAtom(activeTabIdAtom);
  const setDefaultText = useSetAtom(textFamily(DEFAULT_TAB_ID));

  return useCallback(() => {
    setTabIds(RESET);
    setActiveTabId(RESET);
    setDefaultText("");
  }, [setActiveTabId, setDefaultText, setTabIds]);
};

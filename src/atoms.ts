import { atom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";

export const DEFAULT_TAB_ID = "ID-default";

export const textFamily = atomFamily((tabId: string) =>
  atomWithStorage(`text-${tabId}`, "")
);
export const tabIdsAtom = atomWithStorage("tabIds", [DEFAULT_TAB_ID]);
export const activeTabIdAtom = atomWithStorage("activeTabId", DEFAULT_TAB_ID);

export const activeTextAtom = atom((get) => {
  const activeTabId = get(activeTabIdAtom);
  const textAtom = textFamily(activeTabId);
  return textAtom;
});

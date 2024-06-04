import { logEvent } from 'firebase/analytics'
import { useAtom } from "jotai"
import { useCallback, useEffect, useRef } from "react"
import { activeTabIdAtom, tabIdsAtom, textFamily } from "~/atoms"
import { analytics } from '~/firebase'
import { useFullReset } from "~/useFullReset"

export interface TabContextMenuProps {
	tabId: string
	pos: { left: number; top: number }
	onClose: () => void
}

export const TabContextMenu = ({
	tabId,
	pos,
	onClose,
}: TabContextMenuProps) => {
	const ref = useRef<HTMLDivElement>(null)
	const fullReset = useFullReset()
	const [tabIds, setTabIds] = useAtom(tabIdsAtom)
	const [activeTabId, setActiveTabId] = useAtom(activeTabIdAtom)
	const isActive = tabId === activeTabId

	const handleDeleteTab = useCallback(() => {
		if (isActive) {
			const activeTabIndex = tabIds.findIndex((tid) => tabId === tid)
			const nextTabIds = [...tabIds]
			// Remove tab from tab ids array
			nextTabIds.splice(activeTabIndex, 1)
			setTabIds(nextTabIds)

			// Remove tab text from tab family
			textFamily.remove(tabId)

			// Next active tab id to take if available: Next -> Prev -> Default
			const nextActiveTabId =
				nextTabIds[activeTabIndex] || nextTabIds[activeTabIndex - 1]
			if (!nextActiveTabId) {
				fullReset()
			} else {
				setActiveTabId(nextActiveTabId)
			}
		} else {
			// Remove tab from tab ids array
			setTabIds((prev) => prev.filter((tid) => tid !== tabId))

			// Remove tab text from tab family
			textFamily.remove(tabId)
		}
		logEvent(analytics, "remove_tab")
		onClose()
	}, [fullReset, isActive, onClose, setActiveTabId, setTabIds, tabId, tabIds])

	// Listen for document events that should hide this menu
	useEffect(() => {
		const handleScroll = function () {
			onClose()
		}

		const handleClickOutside: (this: Document, e: MouseEvent) => void =
			function (e) {
				if (
					ref.current &&
					e.target &&
					!ref.current.contains(e.target as Node)
				) {
					onClose()
				}
			}

		document.addEventListener("click", handleClickOutside)
		document.addEventListener("scroll", handleScroll)

		return () => {
			document.removeEventListener("click", handleClickOutside)
			document.removeEventListener("scroll", handleScroll)
		}
	}, [onClose])

	return (
		<div className="tab-context-menu" ref={ref} style={pos}>
			<button
				type="button"
				className="tab-context-menu-item"
				onClick={handleDeleteTab}
			>
				Delete
			</button>
		</div>
	)
}

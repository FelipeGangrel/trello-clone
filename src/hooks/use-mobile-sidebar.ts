import { create } from 'zustand'

type MobileSidebarState = {
  isOpen: boolean
}

type MobileSidebarActions = {
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}

export const useMobileSidebar = create<
  MobileSidebarState & MobileSidebarActions
>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

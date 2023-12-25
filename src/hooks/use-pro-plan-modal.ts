import { create } from 'zustand'

type ModalState = {
  isOpen: boolean
}

type ModalActions = {
  onOpen: (id: string) => void
  onClose: () => void
}

export const useProPlanModal = create<ModalState & ModalActions>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

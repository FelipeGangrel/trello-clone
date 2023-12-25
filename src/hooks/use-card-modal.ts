import { create } from 'zustand'

type ModalState = {
  id?: string
  isOpen: boolean
}

type ModalActions = {
  onOpen: (id: string) => void
  onClose: () => void
}

export const useCardModal = create<ModalState & ModalActions>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}))

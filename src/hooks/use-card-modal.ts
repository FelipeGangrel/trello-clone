import { create } from 'zustand'

type CardModalState = {
  id?: string
  isOpen: boolean
}

type CardModalActions = {
  onOpen: (id: string) => void
  onClose: () => void
}

export const useCardModal = create<CardModalState & CardModalActions>(
  (set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined }),
  })
)

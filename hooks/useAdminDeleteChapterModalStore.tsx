import { create } from "zustand";

interface AdminModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useAdminDeleteChapterModalStore = create<AdminModalState>((set) => ({
  isOpen: false,
  openModal: () => set((state) => ({ isOpen: (state.isOpen = true) })),
  closeModal: () => set((state) => ({ isOpen: (state.isOpen = false) })),
}));

export default useAdminDeleteChapterModalStore;

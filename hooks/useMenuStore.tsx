import { create } from "zustand";

interface MenuState {
  isOpen: boolean;
  handleChange: () => void;
  onClose: () => void;
}

const useMenuStore = create<MenuState>((set) => ({
  isOpen: false,
  handleChange: () => set((state) => ({ isOpen: !state.isOpen })),
  onClose: () => set({ isOpen: false }),
}));

export default useMenuStore;

import { create } from "zustand";

interface MenuState {
  isOpen: boolean;
  handleChange: () => void;
}

const useMenuStore = create<MenuState>((set) => ({
  isOpen: false,
  handleChange: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useMenuStore;

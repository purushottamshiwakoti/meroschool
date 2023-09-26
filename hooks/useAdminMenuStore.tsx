import { create } from "zustand";

interface MenuState {
  isOpen: boolean;
  closeMenu: () => void;
}

const useAdminMenuStore = create<MenuState>((set) => ({
  isOpen: true,
  closeMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useAdminMenuStore;

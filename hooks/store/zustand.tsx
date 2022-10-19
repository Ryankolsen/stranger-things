import create from "zustand";

interface navState {
  showMobileMenu: boolean;
  changeState: () => void;
}

export const useNavStore = create<navState>()((set) => ({
  showMobileMenu: false,
  changeState: () =>
    set((state) => ({ showMobileMenu: !state.showMobileMenu })),
}));

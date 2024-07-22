import { create } from 'zustand';

const useStore = create((set) => ({
    mode: 'light',
    user: null,
    token: "",
    tasks: [],
    setLogin: (user, token) => set({ user, token}),
    setToken: (t) => set({token: t}),
}));

export default useStore;

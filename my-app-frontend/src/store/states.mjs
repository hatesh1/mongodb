import { create } from 'zustand'

export const store = create((set) => ({
    user: null,
    isLogin: false,

    // Accept payload as a parameter
    globalLogin: (userData) => {
        set({
            user: userData,
            isLogin: true,
        })
    },

    globalLogout: () => {
        set({
            user: null,
            isLogin: false,
        })
    },
}))
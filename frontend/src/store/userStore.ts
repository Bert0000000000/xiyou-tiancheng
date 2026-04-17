import { create } from 'zustand'

interface User {
  id: string
  nickname: string
  avatar?: string
  exp: number
  level: number
}

interface UserState {
  user: User | null
  level: number
  setUser: (user: User) => void
  addExp: (exp: number) => void
  reset: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  level: 1,
  setUser: (user) => set({ user, level: user.level }),
  addExp: (exp) =>
    set((state) => {
      if (!state.user) return state
      const newExp = state.user.exp + exp
      const newLevel = Math.floor(newExp / 1000) + 1
      return {
        user: { ...state.user, exp: newExp, level: newLevel },
        level: newLevel,
      }
    }),
  reset: () => set({ user: null, level: 1 }),
}))

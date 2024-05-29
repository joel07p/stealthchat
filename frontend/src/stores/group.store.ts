import { Group } from '@/pages/home-page'
import { create } from 'zustand'

type GroupStore = {
  groupId: string | undefined,
  group: Group | null
  setGroupId: (groupId: string | undefined) => void
  setGroup: (group: Group) => void
}

export const useGroupStore = create<GroupStore>((set) => ({
    groupId: "",
    group: null,
    setGroupId: (groupId: string | undefined) => {
      set({groupId})
    },
    setGroup: (group: Group) => {
      set({group})
    }
}))

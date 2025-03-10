import { create } from "zustand";
import { persist } from "zustand/middleware";
import { users } from "@/data/users";

interface UserStore {
  displayName: string;
  username: string;
  avatarUrl: string;
}

export const useUserStore = create<UserStore>()(
  persist(
    () => ({
      ...users.currentUser,
    }),
    {
      name: "user-storage",
    }
  )
);

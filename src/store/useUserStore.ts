import { create } from "zustand";
import { users } from "@/data/users";

interface UserStore {
  displayName: string;
  username: string;
  avatarUrl: string;
}

export const useUserStore = create<UserStore>(() => ({
  ...users.currentUser,
}));

import { create } from "zustand";

interface UserStore {
  username: string;
  avatarUrl: string;
}

export const useUserStore = create<UserStore>(() => ({
  username: "Sarah Wilson",
  avatarUrl:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=80",
}));

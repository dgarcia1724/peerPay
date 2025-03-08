import { create } from "zustand";

interface UserStore {
  displayName: string;
  username: string;
  avatarUrl: string;
}

export const useUserStore = create<UserStore>(() => ({
  displayName: "Sarah Wilson",
  username: "sarah-wilson-123",
  avatarUrl:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=80",
}));

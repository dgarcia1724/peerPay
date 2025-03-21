export interface Friend {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
}

export const friends: Friend[] = [
  {
    id: "1",
    username: "emma.rodriguez",
    displayName: "Emma Rodriguez",
    avatarUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  },
  {
    id: "2",
    username: "michael-patel",
    displayName: "Michael Patel",
    avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
  },
  {
    id: "3",
    username: "sophia-nguyen",
    displayName: "Sophia Nguyen",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  },
  {
    id: "4",
    username: "james-kim",
    displayName: "James Kim",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  },
  {
    id: "5",
    username: "ava-thompson",
    displayName: "Ava Thompson",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  },
];

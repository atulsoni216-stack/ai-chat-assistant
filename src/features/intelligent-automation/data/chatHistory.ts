import { ChatItem, UserProfileData } from "../types"

export const initialChatHistory: ChatItem[] = [
  {
    id: "chat-1",
    title: "Analysis the Resume with respect to Job Description",
    unreadCount: 2,
    section: "RECENT",
    isActive: true,
  },
  {
    id: "chat-2",
    title: "Analysis the Resume with respect to Job Description",
    section: "RECENT",
    isActive: false,
  },
  {
    id: "chat-3",
    title: "Analysis the Resume with respect to Job Description",
    section: "RECENT",
    isActive: false,
  },
  {
    id: "chat-4",
    title: "Analysis the Resume with respect to Job Description",
    section: "RECENT",
    isActive: false,
  },
  {
    id: "chat-5",
    title: "Analysis the Resume with respect to Job Description",
    section: "YESTERDAY",
    isActive: false,
  },
  {
    id: "chat-6",
    title: "Analysis the Resume with respect to Job Description",
    section: "YESTERDAY",
    isActive: false,
  },
]

export const currentUser: UserProfileData = {
  name: "Simran Gupta",
  email: "simrangupta@ct.com",
  avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
  role: "Lead UI/UX Designer",
}


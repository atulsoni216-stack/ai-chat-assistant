export interface ChatItem {
  id: string
  title: string
  unreadCount?: number
  section: "RECENT" | "YESTERDAY"
  timestamp?: string
  isActive?: boolean
}

export interface UserProfileData {
  name: string
  email: string
  avatarUrl: string
  role?: string
}

export interface UploadedFileItem {
  id: string
  name: string
  size: number
  type: string
}

export interface NavigationItemData {
  id: string
  label: string
  iconName: "workflow" | "rulebook" | "chat"
  href?: string
  badge?: string | number
}


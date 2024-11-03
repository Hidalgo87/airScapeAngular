export interface User {
  userId: string;
  userName: string;
  email: string;
  profilePicture: string;
  bio: string;
  isOwner: boolean;
  createdAt: Date;
  updatedAt: Date;
}

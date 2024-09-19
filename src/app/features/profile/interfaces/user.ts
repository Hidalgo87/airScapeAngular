export interface User {
  userId: number;
  userName: string;
  email: string;
  password: string;
  profilePicture: string;
  bio: string;
  isOwner: boolean;
  createdAt: Date;
  updatedAt: Date;
}

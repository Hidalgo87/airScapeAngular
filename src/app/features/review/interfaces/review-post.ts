import { Review } from './review';

export interface ReviewPost extends Review {
  profilePicture: string;
  userName: string;
}

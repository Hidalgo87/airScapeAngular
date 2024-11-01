import { Review } from './review';

export interface ReviewPost extends Review {
  userPicture: string;
  username: string;
}

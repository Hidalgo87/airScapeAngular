import { ReviewPost } from '../../review/interfaces/review-post';
import { Listing } from './listing.interface';

export interface ListingDetails extends Listing {
  ownerName: string;
  ownerPicture: string;
  reviews: ReviewPost[];
}

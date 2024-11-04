import { Image } from '../../images/interfaces/image.interface';

export interface ListingBrief {
  listingId: string;
  title: string;
  photo: Image;
  pricePerNight: number;
  calification: number;
  maxGuests: number;
  createdAt: Date;
}

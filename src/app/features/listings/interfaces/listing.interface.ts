import { Image } from '../../images/interfaces/image.interface';

export interface Listing {
  listing_id: string;
  title: string;
  photos: Image[];
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  numBedrooms: number;
  numBathrooms: number;
  maxGuests: number;
  createdAt?: Date;
  updatedAt?: Date;
}

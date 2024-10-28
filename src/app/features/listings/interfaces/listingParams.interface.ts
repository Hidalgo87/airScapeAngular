import { Image } from '../../images/interfaces/image.interface';

export interface ListingParams {
  title: string;
  photos: Image[];
  filePhotos: File[];
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  numBedrooms: number;
  numBathrooms: number;
  maxGuests: number;
}

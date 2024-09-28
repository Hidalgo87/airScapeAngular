import { Image } from "../../images/interfaces/image";

export interface Listing {
  listingId: string;
  userId: string;
  title: string;
  photos:Image[];
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  numBedrooms: number;
  numBathrooms: number;
  maxGuests: number;
  createdAt: Date;  
  updatedAt: Date;
}

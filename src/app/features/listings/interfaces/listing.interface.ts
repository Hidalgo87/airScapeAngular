import { Image } from "../../images/interfaces/image.interface";

export interface Listing {
  listingId: string;
  userName: string;
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
  createdAt?: Date;  
  updatedAt?: Date;
}

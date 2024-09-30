export interface ListingParams {
  title: string;
  userName:string
  filePhotos:File[];
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  numBedrooms: number;
  numBathrooms: number;
  maxGuests: number;
}

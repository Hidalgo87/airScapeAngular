export interface Listing {
  listingId: number;
  userId: number;
  title: string;
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

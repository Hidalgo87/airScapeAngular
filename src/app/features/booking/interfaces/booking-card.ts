export interface BookingCard {
  bookingId: string;
  status: string;
  hostName: string;
  bookedAt: Date;
  propertyTitle: string;
  listingId: string;
  hostPicture: string;
  price: number;
  propertyImage: string;
  bookingStart: Date;
  bookingEnd: Date;
}

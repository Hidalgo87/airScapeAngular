export interface BookingCard {
  bookingId: number;
  status: string;
  hostName: string;
  bookedAt: Date;
  propertyTitle: string;
  hostPicture: string;
  price: number;
  propertyImage: string;
  bookingStart: Date;
  bookingEnd: Date;
}

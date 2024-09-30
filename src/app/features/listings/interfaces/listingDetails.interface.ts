import { Listing } from "./listing.interface";

export interface ListingDetails extends Listing{
    ownerName:string,
    ownerPicture:string
}

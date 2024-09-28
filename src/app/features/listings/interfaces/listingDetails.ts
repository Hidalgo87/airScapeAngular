import { Listing } from "./listing";

export interface ListingDetails extends Listing{
    ownerName:string,
    ownerPicture:string
}

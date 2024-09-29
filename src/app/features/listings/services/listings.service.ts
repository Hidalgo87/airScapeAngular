import { Injectable } from '@angular/core';
import { ImageService } from '../../images/services/image.service';
import { Listing } from '../interfaces/listing';
import { ListingParams } from '../interfaces/listingParams';
import { v4 as uuid } from 'uuid';
import { Image } from '../../images/interfaces/image';
import { ListingDetails } from '../interfaces/listingDetails';
import { User } from '../../profile/interfaces/user';

@Injectable({
  providedIn: 'root',
})
/*
metodo busqueda (ciudad string, fecha string (ignorar param, pero pedirlo), num_huespedes num): retorno array propiedades
CHECKED: metodo detalles propiedad (id_propiedad) : retorno listing , el nombre y foto del anfitrión
CHECKED: metodo crear propiedad (puede recibir 1:* imagenes)
metodo editar propiedad ()
*/
export class ListingsService {

  constructor(private imageService:ImageService) {

  }

  async uploadFile(file: File, folderName: string, fileName: string) {
    return await this.imageService.upload(file,folderName, fileName);
  }

  async createListing(listingParams:ListingParams):Promise<Listing> {
    const listingId = uuid();
    let listingImages:Image[] = [];
    listingParams.filePhotos.forEach(async (file) => {
      let imageId = uuid();
      let imageUrl = await this.uploadFile(file, 'listings', `${listingId}/${imageId}`)

      if (imageUrl){
        let image:Image = {
          listingId: listingId,
          imageId: imageId,
          imageUrl: imageUrl
        }
        listingImages.push(image);
      }else {
          console.log('Error subiendo el archivo a la base de datos', file.name);
      }
    });
    
    let listing:Listing = {
      listingId: listingId,
      userId: listingParams.userId,
      title: listingParams.title,
      photos: listingImages,
      description: listingParams.description,
      address: listingParams.address,
      latitude: listingParams.latitude,
      longitude: listingParams.longitude,
      pricePerNight: listingParams.pricePerNight,
      numBedrooms: listingParams.numBedrooms,
      numBathrooms: listingParams.numBathrooms,
      maxGuests: listingParams.maxGuests,
      createdAt: new Date,
      updatedAt: new Date
    }

    localStorage.setItem(`listing-${listingId}`,JSON.stringify(listing));
    return listing;
  }

  getListingDetails(listingId:string):ListingDetails|null{
    const listingSrt = localStorage.getItem(`listing-${listingId}`);
    if (listingSrt) {
      let listing:Listing = JSON.parse(listingSrt);
      const userSrt = localStorage.getItem(`user-${listing.userId}`);
      if (userSrt) {
        let user:User = JSON.parse(userSrt);
        let listingDetails:ListingDetails = {
          ...listing,
          ownerName: user.userName,
          ownerPicture: user.profilePicture
        }
        return listingDetails;
      }
    }
    return null;
  }
  
}

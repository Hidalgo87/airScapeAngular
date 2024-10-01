import { Injectable } from '@angular/core';
import { ImageService } from '../../images/services/image.service';
import { Listing } from '../interfaces/listing.interface';
import { ListingParams } from '../interfaces/listingParams.interface';
import { v4 as uuid } from 'uuid';
import { Image } from '../../images/interfaces/image.interface';
import { ListingDetails } from '../interfaces/listingDetails.interface';
import { User } from '../../profile/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map, Observable } from 'rxjs';
import { ListingBrief } from '../interfaces/listingBrief.interface';
import { UserService } from '../../../auth/services/user.service';

@Injectable({
  providedIn: 'root',
})
/*
CHECKED: metodo crear propiedad createListing(listingParams:ListingParams)
CHECKED: metodo eliminar propiedad deleteListing(listingId:string)
CHECKED: metodo detalles propiedad getListingDetails(listingId:string)
CHECKED: metodo busqueda searchListings(cityName: string, guestsNumber: number, startDate: string = '', endDate: string = '')
CHECKED: metodo editar propiedad editListing(newListing:Listing, newImages:File[])
CHECKED: metodo obtener home getPopularListings(amountListings:number=8)
*/
export class ListingsService {
  user;
  constructor(private imageService:ImageService, private http:HttpClient, private userService:UserService) {
    this.user = userService.getUser();
  }

  deleteListing(listingId:string){
    const allListings = this.getListings().filter(listing => listing.listingId != listingId);
    const listingSrt = JSON.stringify(allListings);
    localStorage.setItem('listings', listingSrt);
  }
  
  async editListing(newListing:Listing, newImages:File[]=[]){
    const allListings = this.getListings().filter(listing => listing.listingId != newListing.listingId);
    const oldListing = this.getListingById(newListing.listingId);
    newListing.createdAt = oldListing?.createdAt;
    newListing.updatedAt = new Date;
    for (let file of newImages){
      const imageId = uuid();
      const imageUrl = await this.uploadFile(file,`listings/${newListing.listingId}`,imageId);
      if (imageUrl){
        const image:Image = {
          listingId: newListing.listingId,
          imageId: imageId,
          imageUrl: imageUrl
        }
        newListing?.photos.push(image);
      }
      else{
        console.error('No se pudo subir la imagen')
      }
    }
    allListings.push(newListing);
    const listingSrt = JSON.stringify(allListings);
    localStorage.setItem('listings', listingSrt);
  }
  
  async searchListings(cityName: string, guestsNumber: number, startDate: string = '', endDate: string = ''):Promise<ListingBrief[]> {
    let nearbyListings: Listing[] = [];
    let nearbyBriefListings: ListingBrief[] = [];
    
    if (cityName.length > 0) {
      nearbyListings = await this.getListingsNearby(cityName);
      
      nearbyBriefListings = nearbyListings.map(listing => {
        return {
          listingId:listing.listingId,
          userName:listing.userName,
          title:listing.title,
          pricePerNight:listing.pricePerNight,
          photo: listing.photos[0],
          calification: parseFloat((Math.random() * (5 - 3) + 3).toFixed(2)),
          maxGuests:listing.maxGuests
        };
      });
    }
    
    let guestsNumberListings:Listing[] = [];
    let guestsNumberBriefListings: ListingBrief[] = [];
    
    if (guestsNumber > 0){
      guestsNumberListings = this.getListings().filter(listing => listing.maxGuests >= guestsNumber);
      guestsNumberBriefListings = guestsNumberListings.map(listing => {
        return {
          listingId:listing.listingId,
          userName:listing.userName,
          title:listing.title,
          pricePerNight:listing.pricePerNight,
          photo: listing.photos[0],
          calification: parseFloat((Math.random() * (5 - 3) + 3).toFixed(2)),
          maxGuests:listing.maxGuests
        };
      });
    }
    
    
    if (guestsNumber === 0) {
      return nearbyBriefListings; 
    }
    if (cityName.length === 0) {
      return guestsNumberBriefListings; 
    }
    
    return nearbyBriefListings.filter(nearbyListing => 
      guestsNumberBriefListings.some(guestsNumberListing => guestsNumberListing.listingId === nearbyListing.listingId)
    );
  }
  
  async uploadFile(file: File, folderName: string, fileName: string) {
    return await this.imageService.upload(file,folderName, fileName);
  }

  getListingDetails(listingId:string):ListingDetails|null{
    const listing = this.getListingById(listingId);
    if (listing) {
      const userSrt = localStorage.getItem(listing.userName);
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

  async createListing(listingParams:ListingParams):Promise<Listing> {
    const listingId = uuid();
    let listingImages:Image[] = [];
    for (let file of listingParams.filePhotos){
      let imageId = uuid();
      let imageUrl = await this.uploadFile(file, 'listings', `${listingId}/${imageId}`)
      console.log('imageUrl', imageUrl);
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
    }
    
    let listing:Listing = {
      listingId: listingId,
      userName: this.user().userName,
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
    let currentListings = this.getListings();
    currentListings=[...currentListings, listing];
    localStorage.setItem('listings',JSON.stringify(currentListings));
    return listing;
  }

  getPopularListings(amountListings:number=8):Listing[]{
    let listingSrt = localStorage.getItem('listings');
    if(listingSrt){
      const listings:Listing[] = JSON.parse(listingSrt);
      const shuffledListings = listings.sort(()=>0.5- Math.random());
      if (amountListings >= listings.length){
        return shuffledListings
      } else {
        return shuffledListings.slice(0,amountListings)
      }
    }
    return [];
  }

  getListingById(listingId:string):Listing|null{
    let listingSrt = localStorage.getItem('listings');
    if(listingSrt){
      const listings:Listing[] = JSON.parse(listingSrt);
      const listingFound = listings.find(element => {
        return element.listingId === listingId
      });
      if (!!listingFound){
        return listingFound
      };
    }
    return null;
  }

  private async getListingsNearby(cityName:string){
  
    const data = await firstValueFrom(this.getLatitudeLongitude(cityName));
    let latitude = 0;
    let longitude = 0;
    data.forEach(coordinate =>{
      latitude = Number.parseFloat(coordinate.lat);
      longitude = Number.parseFloat(coordinate.lon);
    });
    const response = this.findNearbyListings(this.getListings(), latitude, longitude);
    return response;
  }

  private findNearbyListings(
    listings: Listing[],
    targetLat: number,
    targetLon: number
  ): Listing[] {
    const latRange = 0.01; // Aproximadamente 0.4505 grados
    const lonRange = 0.01; // Ajusta según la latitud
    return listings.filter(listing => {
      // Asegúrate de que la propiedad tenga coordenadas válidas
      if (listing.latitude == null || listing.longitude == null) {
        return false;
      }
      return (
        listing.latitude >= (targetLat - latRange) &&
        listing.latitude <= (targetLat + latRange) &&
        listing.longitude >= (targetLon - lonRange) &&
        listing.longitude <= (targetLon + lonRange)
      );
    });
  }
  
  private getLatitudeLongitude(cityName: string): Observable<{ lat: string, lon: string }[]> {
    const apiUrl = 'https://nominatim.openstreetmap.org/search';
    const params = {
      q: cityName,
      format: 'json',
      limit: '1',
      'accept-language': 'en-US'
    };

    return this.http.get<any[]>(apiUrl, { params }).pipe(
      // Mapear la respuesta para extraer solo latitud y longitud
      map(response => response.map(item => ({
        lat: item.lat,
        lon: item.lon
      }))));
  }

  private getListings():Listing[]{
    let listingSrt = localStorage.getItem('listings');
    if(listingSrt){
      return JSON.parse(listingSrt);
    }
    return [];
  }
}

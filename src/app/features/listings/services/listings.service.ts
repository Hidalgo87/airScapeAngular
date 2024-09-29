import { Injectable } from '@angular/core';
import { ImageService } from '../../images/services/image.service';
import { Listing } from '../interfaces/listing.interface';
import { ListingParams } from '../interfaces/listingParams.interface';
import { v4 as uuid } from 'uuid';
import { Image } from '../../images/interfaces/image.interface';
import { ListingDetails } from '../interfaces/listingDetails.interface';
import { User } from '../../profile/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ListingBrief } from '../interfaces/listingBrief.interface';

@Injectable({
  providedIn: 'root',
})
/*
metodo eliminar propiedad (listingId)
metodo editar propiedad (JSON.listing)
FALTA PROBARLOS:
CHECKED: metodo busqueda (ciudad string, fecha string (ignorar param, pero pedirlo), num_huespedes num): retorno imagen, nombre, precio, calificacion
CHECKED: metodo detalles propiedad (id_propiedad) : retorno listing , el nombre y foto del anfitrión
CHECKED: metodo crear propiedad (puede recibir 1:* imagenes)
*/
export class ListingsService {

  constructor(private imageService:ImageService, private http:HttpClient) {

  }

  searchListings(cityName: string, guestsNumber: number, startDate: string = '', endDate: string = ''):ListingBrief[] {
    let nearbyListings: Listing[] = [];
    let nearbyBriefListings: ListingBrief[] = [];
    
    if (cityName.length > 0) {
      nearbyListings = this.getListingsNearby(cityName);
      
      nearbyBriefListings = nearbyListings.map(listing => {
        return {
          listingId:listing.listingId,
          userName:listing.userName,
          title:listing.title,
          pricePerNight:listing.pricePerNight,
          photo: listing.photos[0],
          calification: parseFloat((Math.random() * (5 - 3) + 3).toFixed(2))
        };
      });
    }
    
    let guestsNumberListings:Listing[] = [];
    let guestsNumberBriefListings: ListingBrief[] = [];

    if (guestsNumber > 0){
    guestsNumberListings = this.getListings().filter(listing => listing.maxGuests <= guestsNumber);
    guestsNumberBriefListings = guestsNumberListings.map(listing => {
      return {
        listingId:listing.listingId,
        userName:listing.userName,
        title:listing.title,
        pricePerNight:listing.pricePerNight,
        photo: listing.photos[0],
        calification: parseFloat((Math.random() * (5 - 3) + 3).toFixed(2))
      };
    });
    }
    
  
    if (guestsNumberBriefListings.length === 0) {
      return nearbyBriefListings; 
    }
    if (nearbyBriefListings.length === 0) {
      return guestsNumberBriefListings; 
    }

    return nearbyBriefListings.filter(nearbyListing => 
      guestsNumberBriefListings.some(guestsNumberListing => guestsNumberListing.listingId === nearbyListing.listingId)
    );
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
      userName: listingParams.userName,
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
    localStorage.setItem(`listings`,JSON.stringify(currentListings));
    return listing;
  }

  getListingDetails(listingId:string):ListingDetails|null{
    const listingSrt = localStorage.getItem(`listing-${listingId}`);
    if (listingSrt) {
      let listing:Listing = JSON.parse(listingSrt);
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

  private getListingsNearby(cityName:string, rate:number=50){
    let coordinates: { lat: string, lon: string }[] = [];
  
    this.getLatitudeLongitude(cityName).subscribe({
      next: (data) => {
        coordinates = data;
        console.log('Coordinates:', coordinates);
      },
      error: (error) => {
        console.error('Error fetching location data:', error);
      },
      complete: () => {
        console.log('Location data fetch complete');
      }
    });
    let latitude = 0;
    let longitude = 0;
    coordinates.forEach(coordinate =>{
      latitude = Number.parseFloat(coordinate.lat);
      longitude = Number.parseFloat(coordinate.lon);
    });

    return this.findNearbyListings(this.getListings(), latitude, longitude, rate);

  }

  private haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (value: number) => (value * Math.PI) / 180; // Convierte grados a radianes
  
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; 
  }

  private findNearbyListings(
    listings: Listing[],
    targetLat: number,
    targetLon: number,
    range: number 
  ): Listing[] {
    return listings.filter(listing => {
      const distance = this.haversineDistance(targetLat, targetLon, listing.latitude, listing.longitude);
      return distance <= range; // Filtrar propiedades dentro del rango
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
    let listingSrt = localStorage.getItem(`listings`);
    if(listingSrt){
      return JSON.parse(listingSrt);
    }
    return [];
  }

  getListingById(listingId:string):Listing|null{
    let listingSrt = localStorage.getItem(`listings`);
    if(listingSrt){
      const listings:Listing[] = JSON.parse(listingSrt);
      const listingFound = listings.find(element => {
        element.listingId === listingId
      });
      if (!!listingFound){
        return listingFound
      };
    }
    return null;
  }
}

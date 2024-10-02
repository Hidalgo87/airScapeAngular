import { Injectable, OnInit } from '@angular/core';
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
export class ListingsService implements OnInit {
  user;
  constructor(private imageService:ImageService, private http:HttpClient, private userService:UserService) {
    this.user = userService.getUser();
  }

  ngOnInit(): void {
    if (!localStorage.getItem('listings')){
      localStorage.setItem('listings', `[{"listingId":"d26a028d-eed3-49e3-a800-c63e138dcfaa","userName":"cristianfranco","title":"Guatavita - Stunning cabins - La Leopolda","photos":[{"listingId":"d26a028d-eed3-49e3-a800-c63e138dcfaa","imageId":"4cd295b3-b658-4d52-8182-0a9d4594b53b","imageUrl":"https://poahqglqttfchvblwoav.supabase.co/storage/v1/object/public/airScapeBKT/listings/d26a028d-eed3-49e3-a800-c63e138dcfaa/4cd295b3-b658-4d52-8182-0a9d4594b53b"}],"description":"Really nice place","address":"Cl. 25 #89-45","latitude":6.2443382,"longitude":-75.573553,"pricePerNight":335000,"numBedrooms":2,"numBathrooms":1,"maxGuests":3,"createdAt":"2024-09-30T00:01:55.292Z","updatedAt":"2024-09-30T00:01:55.292Z"},{"listingId":"6ce06c2a-40a6-4e00-8a0d-5900bfa6d14c","userName":"cristianfranco","title":"Glamping The Calera","photos":[{"listingId":"6ce06c2a-40a6-4e00-8a0d-5900bfa6d14c","imageId":"286a8067-70d3-48e6-9859-c8458137a9d7","imageUrl":"https://poahqglqttfchvblwoav.supabase.co/storage/v1/object/public/airScapeBKT/listings/6ce06c2a-40a6-4e00-8a0d-5900bfa6d14c/286a8067-70d3-48e6-9859-c8458137a9d7"}],"description":"A unique glamping experience in nature.","address":"Cra. 12 #23-76","latitude":6.235672,"longitude":-75.580432,"pricePerNight":292000,"numBedrooms":1,"numBathrooms":1,"maxGuests":2,"createdAt":"2024-09-30T00:10:48.523Z","updatedAt":"2024-09-30T00:10:48.523Z"},{"listingId":"bbe7ab7b-fb9c-4238-b66a-9c653c2cc8dc","userName":"cristianfranco","title":"Tiny House with Natural Pool and King Bed","photos":[{"listingId":"bbe7ab7b-fb9c-4238-b66a-9c653c2cc8dc","imageId":"3e07dddb-8657-44fe-abdb-ddb1dc221007","imageUrl":"https://poahqglqttfchvblwoav.supabase.co/storage/v1/object/public/airScapeBKT/listings/bbe7ab7b-fb9c-4238-b66a-9c653c2cc8dc/3e07dddb-8657-44fe-abdb-ddb1dc221007"}],"description":"Cozy tiny house with an amazing natural pool.","address":"Cl. 10 #44-28","latitude":6.248729,"longitude":-75.574391,"pricePerNight":440000,"numBedrooms":1,"numBathrooms":1,"maxGuests":2,"createdAt":"2024-09-30T00:21:39.437Z","updatedAt":"2024-09-30T00:21:39.437Z"},{"listingId":"a17897a9-8003-4054-8faa-d5976c6366d8","userName":"cristianfranco","title":"Nature Cabin- Breakfast Included","photos":[{"listingId":"a17897a9-8003-4054-8faa-d5976c6366d8","imageId":"72534d83-17ca-4f16-a5d0-eca9323cea5e","imageUrl":"https://poahqglqttfchvblwoav.supabase.co/storage/v1/object/public/airScapeBKT/listings/a17897a9-8003-4054-8faa-d5976c6366d8/72534d83-17ca-4f16-a5d0-eca9323cea5e"}],"description":"Charming cabin with breakfast included in the booking.","address":"Cra. 8 #56-13","latitude":6.24286,"longitude":-75.570731,"pricePerNight":249000,"numBedrooms":1,"numBathrooms":1,"maxGuests":2,"createdAt":"2024-09-30T00:22:21.939Z","updatedAt":"2024-09-30T00:22:21.939Z"},{"listingId":"9920878a-5b20-462b-9ad0-c05f8c883a1e","userName":"cristianfranco","title":"Cozy cabin in Guatavita","photos":[{"listingId":"9920878a-5b20-462b-9ad0-c05f8c883a1e","imageId":"a02d9f76-123c-40b4-86cc-135e591fdb3d","imageUrl":"https://poahqglqttfchvblwoav.supabase.co/storage/v1/object/public/airScapeBKT/listings/9920878a-5b20-462b-9ad0-c05f8c883a1e/a02d9f76-123c-40b4-86cc-135e591fdb3d"}],"description":"Beautiful cabin in the heart of Guatavita.","address":"Cl. 22 #47-92","latitude":6.246524,"longitude":-75.571923,"pricePerNight":400000,"numBedrooms":2,"numBathrooms":1,"maxGuests":4,"createdAt":"2024-09-30T00:25:18.261Z","updatedAt":"2024-09-30T00:25:18.261Z"},{"listingId":"52193690-41d4-46cc-a48c-be3643f70a8e","userName":"lianamargarita","title":"LUXE High Rise City & Mnt. Views, Pool & Parking","photos":[{"listingId":"52193690-41d4-46cc-a48c-be3643f70a8e","imageId":"019db077-a15d-44a4-ab07-3976a5128a40","imageUrl":"https://poahqglqttfchvblwoav.supabase.co/storage/v1/object/public/airScapeBKT/listings/52193690-41d4-46cc-a48c-be3643f70a8e/019db077-a15d-44a4-ab07-3976a5128a40"}],"description":"Luxury high-rise apartment with stunning city and mountain views.","address":"Cra. 33 #19-40","latitude":6.241972,"longitude":-75.575382,"pricePerNight":374000,"numBedrooms":2,"numBathrooms":2,"maxGuests":4,"createdAt":"2024-09-30T00:30:37.055Z","updatedAt":"2024-09-30T00:30:37.055Z"},{"listingId":"4899b8ab-d068-43cc-9bdd-5807b66d1a18","userName":"lianamargarita","title":"Exclusive Beach House 4-Bedroom's","photos":[{"listingId":"4899b8ab-d068-43cc-9bdd-5807b66d1a18","imageId":"fea443e8-1283-4948-88d1-af09f11daeff","imageUrl":"https://poahqglqttfchvblwoav.supabase.co/storage/v1/object/public/airScapeBKT/listings/4899b8ab-d068-43cc-9bdd-5807b66d1a18/fea443e8-1283-4948-88d1-af09f11daeff"}],"description":"Exclusive beach house with stunning ocean views.","address":"Cra. 5 #81-30","latitude":6.243783,"longitude":-75.578192,"pricePerNight":4038000,"numBedrooms":4,"numBathrooms":3,"maxGuests":8,"createdAt":"2024-09-30T00:31:10.669Z","updatedAt":"2024-09-30T00:31:10.669Z"},{"title":"New Cabin ocean front near Palomino","userName":"lianamargarita","description":"Brand new oceanfront cabin near Palomino beach.","address":"Cl. 7 #50-91","latitude":6.247391,"longitude":-75.576893,"pricePerNight":603000,"numBedrooms":2,"numBathrooms":2,"maxGuests":5,"listingId":"387a2c53-e15f-4450-8186-9539127cd4c7","photos":[{"imageId":"2b007ef8-cdae-4d77-80c5-f52527895611","imageUrl":"https://poahqglqttfchvblwoav.supabase.co/storage/v1/object/public/airScapeBKT/listings/387a2c53-e15f-4450-8186-9539127cd4c7/2b007ef8-cdae-4d77-80c5-f52527895611","listingId":"387a2c53-e15f-4450-8186-9539127cd4c7"}],"createdAt":"2024-09-30T01:12:20.789Z","updatedAt":"2024-09-30T03:06:30.729Z"}]`)
    }
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

import { Injectable } from '@angular/core';
import { Review } from '../interfaces/review';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createReview(review: Review, listingId: number) {
    const body = {
      rating: review.rating,
      comment: review.review,
      listingId,
    };

    return this.http.post<Review>(`${this.apiUrl}/reviews`, body);
  }
}

import { Injectable } from '@angular/core';
import { Review } from '../interfaces/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor() {}

  createReview(review: Review) {}
}

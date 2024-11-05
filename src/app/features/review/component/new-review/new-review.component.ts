import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { EventEmitter } from 'stream';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-new-review',
  standalone: true,
  imports: [DialogModule, ButtonModule, RatingModule, FormsModule],
  templateUrl: './new-review.component.html',
  styleUrl: './new-review.component.css',
})
export class NewReviewComponent {
  visible: boolean = false;

  rating: number = 0;
  comment: string = '';

  @Input() listingId: string = '';

  constructor(private reviewService: ReviewService) {}

  showDialog() {
    this.visible = true;
  }

  onSave() {
    const review = {
      rating: this.rating,
      comment: this.comment,
    };

    this.reviewService.createReview(review, this.listingId).subscribe({
      next: () => {
        this.visible = false;
      },
    });
  }

  onCancel() {
    this.visible = false;
  }
}

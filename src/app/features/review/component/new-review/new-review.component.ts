import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { EventEmitter } from 'stream';

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

  // @Output eventSave: EventEmitter<>

  showDialog() {
    this.visible = true;
  }

  onSave() {
    this.visible = false;
  }

  onCancel() {
    this.visible = false;
  }
}

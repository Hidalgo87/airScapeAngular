import { Component, Input } from '@angular/core';
import { ReviewPost } from '../../interfaces/review-post';

@Component({
  selector: 'app-review-post',
  standalone: true,
  imports: [],
  templateUrl: './review-post.component.html',
  styleUrl: './review-post.component.css',
})
export class ReviewPostComponent {
  @Input() review!: ReviewPost;
}

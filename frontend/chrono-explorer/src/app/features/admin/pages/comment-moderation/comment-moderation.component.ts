import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comments/comments.component'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-moderation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-moderation.component.html',
  styleUrls: ['./comment-moderation.component.css'],
})
export class CommentModerationComponent implements OnInit {
  comments: any[] = [];
  loading = false;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.loading = true;
    this.commentService.getPendingComments().subscribe(data => {
      this.comments = data;
      this.loading = false;
    });
  }

  approveComment(id: number) {
    this.commentService.validateComment(id).subscribe(() => {
      this.loadComments();
    });
  }

  rejectComment(id: number) {
    this.commentService.rejectComment(id).subscribe(() => {
      this.loadComments();
    });
  }
}

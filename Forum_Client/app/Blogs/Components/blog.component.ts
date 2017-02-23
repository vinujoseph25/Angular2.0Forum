import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';
import { Blog } from '../Models/blog';
import { Comment } from '../Models/comment';
import { BlogService } from '../Services/blog.service';
import { EmitterService } from '../../emitter.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/Blogs//Components/blog.component.html',
  providers: [BlogService]
})
export class BlogComponent {
  blogs: Blog[];
  private newBlog = new Blog(new Date(), '', '',"",[],0,0,0);
  private newComment = new Comment(new Date(), '', '',0,0);
  selectedBlog: Blog;
  error: any;
  commentHide: boolean = false;
  commentCount: number;

      // Event tracking properties
    // private listId = 'COMMENT_COMPONENT_LIST';
    // private editId = 'COMMENT_COMPONENT_EDIT';

      // Input properties
    @Input() listId: string;
    @Input() editId: string;

  constructor(private router: Router, private blogService: BlogService) { }

  getBlogs() {
    this.blogService.getBlogs().subscribe(
      blogs => {
        this.blogs = blogs;
        for (let i = 0; i < this.blogs.length; i++) {
          let tempBlog = this.blogs[i];
          this.commentCount = tempBlog.comments.length;
        }
      },
      error => this.error = <any>error);
  }

  addBlog(newBlog: Blog) {
    if (!newBlog) { return; }
//    this.blogs.push(newBlog);
    console.log(JSON.stringify(newBlog));
    
    this.blogService.postBlogs(newBlog)
                 .subscribe(
                   blog  => this.blogs= blog,
                   error =>  this.error = <any>error);
  }

  ngOnInit() {
    this.getBlogs();
  }

  toggleComment() {
    this.commentHide = !this.commentHide;
  }

      ngOnChanges(changes:any) {
        // Listen to the 'list'emitted event so as populate the model
        // with the event payload
        EmitterService.get(this.listId).subscribe((blogs:Blog[]) => {this.blogs = blogs});
    }
}
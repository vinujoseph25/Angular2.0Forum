import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Discussion } from './discussion';
import { DiscussionService } from './discussion.service';

@Component({
   selector: 'my-app',
   templateUrl: 'app/Discussions/discussion.component.html',
   providers:[DiscussionService]
})
export class DiscussionComponent implements OnInit
{
    discussions: Discussion[];
    selectedDiscussion: Discussion;
    error:any;
    
  constructor(private router: Router,private discussionService: DiscussionService){ }
  
  getDiscussions(){
	this.discussionService.getDiscussions().then(discussions => this.discussions = discussions)
    .catch(error=>this.error=error);    
  }
  
  ngOnInit() {
	this.getDiscussions();
  }
  
  onSelect(discussion: Discussion) { this.selectedDiscussion = discussion }
  
  gotoDetail() {
    this.router.navigate(['/discussion',  this.selectedDiscussion.id ]);
  }
}
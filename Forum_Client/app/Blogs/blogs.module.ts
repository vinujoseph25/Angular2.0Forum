import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { BlogComponent } from './Components/blog.component';
// import { CommentListComponent } from './components/comment-list.component';
// import { CommentFormComponent } from './components/comment-form.component';
// import { CommentComponent } from './components/index';


import { BlogService } from './Services/blog.service';


@NgModule({
  imports: [BrowserModule,FormsModule,HttpModule,JsonpModule],
  declarations: [BlogComponent],
  providers: [BlogService],
  exports:[BlogComponent]
  
})
export class BlogModule {
}


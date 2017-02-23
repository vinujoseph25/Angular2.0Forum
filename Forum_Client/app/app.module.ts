import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { BlogModule } from './Blogs/blogs.module';

import { EmitterService } from './emitter.service';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { DiscussionComponent } from './Discussions/discussion.component';
import { BlogComponent } from './Blogs/Components/blog.component';
import { QueryComponent } from './Queries/query.component';
import { HomeComponent } from './Home/home.component';

@NgModule({
  imports:      [BrowserModule,FormsModule,HttpModule, JsonpModule, routing,BlogModule],
  declarations: [AppComponent,DiscussionComponent,QueryComponent,HomeComponent],
  providers:    [EmitterService],
  bootstrap:    [AppComponent]
       
})
export class AppModule { }
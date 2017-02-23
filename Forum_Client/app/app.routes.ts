import { Routes, RouterModule } from '@angular/router';
import { DiscussionComponent } from './Discussions/discussion.component';
import { BlogComponent } from './Blogs/Components/blog.component';
import { QueryComponent } from './Queries/query.component';
import { HomeComponent } from './Home/home.component';

 const routes: Routes = [
    { path:'',redirectTo:'/',pathMatch:'full'},
    { path: 'home', component: HomeComponent },
    { path: 'discussion', component: DiscussionComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'query',component: QueryComponent}
];  

export const routing = RouterModule.forRoot(routes);

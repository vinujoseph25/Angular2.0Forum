import { Injectable }    from '@angular/core';
import { Headers, Http,Response,RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Blog } from '../Models/blog';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable()
export class BlogService {
    constructor(private http: Http) { }
    private blogsUrl = 'http://localhost:3002/api/blogs';

    getBlogs(): Observable<Blog[]> {
        return this.http.get(this.blogsUrl)
            .map((response: Response) => <Blog[]>response.json())
            // .do(data => console.log("All: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    postBlogs(newBlog: Object): Observable<Blog[]> {
        let body = JSON.stringify( newBlog );
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option        

        return this.http.post(this.blogsUrl, body, options)
            .map((response: Response) => <Blog[]>response.json())
            .do(data => console.log("Data pushed to server: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: any) {
        
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); 
        return Observable.throw(errMsg);
    }
}
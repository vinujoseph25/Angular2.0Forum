import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Discussion } from './discussion';

@Injectable()
export class DiscussionService {
    private discussionsUrl = './api/discussion/discussions.json';
    constructor(private http: Http) { }
    getDiscussions() {
        return this.http.get(this.discussionsUrl)
            .toPromise()
            .then(response => response.json() as Discussion[])
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

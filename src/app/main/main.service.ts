/**
 * Angular dependencies
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MainService {

    /**
     * Searh Details Event
     */
    public searchTitleSubject = new Subject<any>();

    constructor(private http: HttpClient) {
    }

    /**
     * Gets all news info based
     * HTTP Request
     * http://starlord.hackerearth.com/hackernews
     */
    GetHackerNews() {
        return this.http.get('http://starlord.hackerearth.com/hackernews');
    }
}

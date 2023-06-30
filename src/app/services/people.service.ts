import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ApiResult {
  page: number;
  cast: [];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  getCurrentPopularPeople(page = 1): Observable<ApiResult> {
    console.log("getCurrentPopularPeople function called");
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/person/popular?api_key=${environment.apiKey}&page=${page}`
    );
  }//end getCurrentPopularPeople function

  getPeopleCredits(id: string): Observable<ApiResult> {
    console.log("getPeopleCredits function called");
    console.log(`${environment.baseUrl}/person/${id}/movie_credits?api_key=${environment.apiKey}`);
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/person/${id}/movie_credits?api_key=${environment.apiKey}`
    );
  }

  getPeopleDetails(id: string) {
    console.log("getPeopleDetails function called");
    return this.http.get(
      `${environment.baseUrl}/person/${id}?api_key=${environment.apiKey}`
    );
  }//end getDetailsPeople function
}//end class
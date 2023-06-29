import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ApiResult {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getCurrentPopularMovies(page = 1): Observable<ApiResult> {
    console.log("getCurrentPopularMovies function called");
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`
    );
  }//end getCurrentPopularMovies function

  getSimilarMovies(id: string, page: number): Observable<ApiResult> {
    console.log("getSimilarMovies function called");
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/movie/${id}/similar?api_key=${environment.apiKey}&page=${page}`
    );
  }//end getSimilarMovies function

  getMovieDetails(id: string) {
    console.log("getMovieDetails function called");
    return this.http.get(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
    );
  }//end getMovieDetails function

  getQueryResults(query: string): Observable<ApiResult> {
    console.log("getQueryResults function called");
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/search/multi?query=${query}&api_key=${environment.apiKey}`
    );
  }//end getSearchQuery function

}//end class

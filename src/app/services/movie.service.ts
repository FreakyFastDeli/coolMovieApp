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
  searchMovies(searchTerm: any) {
    throw new Error('Method not implemented.');
  }//end searchMovies function

  constructor(private http: HttpClient) { }

  getCurrentPopularMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`
    );
  }//end getCurrentPopularMovies function

  getSimilarMovies(id: string): Observable<ApiResult> {
    
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/movie/${id}/similar?api_key=${environment.apiKey}`
    );
  }//end getSimilarMovies function

  getMovieDetails(id: string) {
    return this.http.get(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
    );
  }//end getMovieDetails function

}//end class

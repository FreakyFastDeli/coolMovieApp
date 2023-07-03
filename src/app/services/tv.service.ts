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
export class TvService {

  constructor(private http: HttpClient) { }

  getCurrentPopularTV(page = 1): Observable<ApiResult> {
    console.log("getCurrentPopularTV function called");
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/tv/popular?api_key=${environment.apiKey}&with_original_language=en&page=${page}`
    );
  }//end getCurrentPopularTV function

  getSimilarTV(id: string, page: number): Observable<ApiResult> {
    console.log("getTVSimilar function called");
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/tv/${id}/similar?api_key=${environment.apiKey}&with_original_language=en&page=${page}`
    );
  }//end getSimilarTV function

  getTVDetails(id: string) {
    console.log("getTVDetails function called");
    return this.http.get(
      `${environment.baseUrl}/tv/${id}?api_key=${environment.apiKey}&with_original_language=en`
    );
  }//end getDetailsTV function

  getQueryResults(query: string): Observable<ApiResult> {
    console.log("getQueryResults function called");
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/search/tv?query=${query}&api_key=${environment.apiKey}&with_original_language=en`
    );
  }//end getSearchQuery function
  
}//end class

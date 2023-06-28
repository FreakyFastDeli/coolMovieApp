import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie:any = null;
  page: number = 1;
  similarMovies:any[] = [];
  //simMoviesTmp:any[] = [];
  imageBaseUrl = environment.images;
  showSimilarMovies = false;

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService
    ) {}

    
    
  ngOnInit() {
    
    const id: any = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(id).subscribe(res => {
      console.log(res);
      console.log("current selected movie details^^");
      this.movie = res;
    });//end subscribe to getMovieDetails
    this.movieService.getSimilarMovies(id, this.page).subscribe(res => {
      console.log(res);
      console.log("similar movies^^");
      this.similarMovies = res.results.splice(0, 5);
      // this.similarMovies = this.similarMovies.slice(0, 5);
      // console.log(this.similarMovies);
      // console.log("shortened similar movies^^");
    });//end subscribe to getSimilarMovies
    

    
  }//end ngOnInit function

  openHomepage(){
    window.open(this.movie.homepage);
  }//end openHomePage function

  toggleSimilarMovies(){
    this.showSimilarMovies = !this.showSimilarMovies;
    //this.getTmp();
  }//end toggleSimilarMovies function

  getRoute(id: string){
    return `../${id} `;
  }//end getRoute function

  // getNextFive(){
  //   if(this.similarMovies.length == 0){
  //     this.page ++;
  //     this.movieService.getSimilarMovies(this.movie.id, this.page).subscribe(res => {
  //       console.log(res);
  //       console.log("page " + this.page + " of similar movies^^");
  //       this.similarMovies = res.results;
  //       console.log("getnextfive called with new page");
  //       console.table(this.similarMovies);
      
  //       return this.similarMovies.splice(0, 5);
  //     });//end subscribe to getSimilarMovies
  //   }//end if

  //     console.log("getnextfive called");
  //     console.table(this.similarMovies);
  //     return this.similarMovies.splice(0, 5);

  // }//end getNextFive function
  
  // getTmp(){
  //   this.simMoviesTmp = this.getNextFive();
  //   return this.simMoviesTmp;
  // }//end getTmp function

}//end class

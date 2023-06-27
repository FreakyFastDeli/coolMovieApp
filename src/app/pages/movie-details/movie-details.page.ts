import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie:any = null;
  similarMovies:any[] = [];
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
    this.movieService.getSimilarMovies(id).subscribe(res => {
      console.log(res);
      console.log("similar movies^^");
      this.similarMovies = res.results;
      this.similarMovies = this.similarMovies.slice(0, 5);
      console.log(this.similarMovies);
      console.log("shortened similar movies^^");
    });//end subscribe to getSimilarMovies
  }//end ngOnInit function

  openHomepage(){
    window.open(this.movie.homepage);
  }//end openHomePage function

  toggleSimilarMovies(){
    this.showSimilarMovies = !this.showSimilarMovies;
  }//end toggleSimilarMovies function

}//end class

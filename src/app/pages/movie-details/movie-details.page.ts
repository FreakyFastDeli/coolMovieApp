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
  imageBaseUrl = environment.images;
  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService
    ) {}

  ngOnInit() {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(id).subscribe(res => {
      console.log(res);
      this.movie = res;
    });
  }//end ngOnInit function

  openHomepage(){
    window.open(this.movie.homepage);
  }//end openHomePage function

}//end class

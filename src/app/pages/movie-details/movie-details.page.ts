import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  protected movie: any = null;
  protected page: number = 1;
  protected similarMovies: any[] = [];
  protected nextFiveSimilarMovies: any[] = []; 
  protected imageBaseUrl = environment.images;
  protected showSimilarMovies = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(id).subscribe((res) => {
      console.log(res);
      console.log("current selected movie details^^");
      this.movie = res;
    });
  }//end ngOnInit function

  openHomepage() {
    window.open(this.movie.homepage);
  }//end openHomepage function

  toggleSimilarMovies() {
    this.showSimilarMovies = !this.showSimilarMovies;
    this.getSimilarMovies();
  }//end toggleSimilarMovies function

  getRoute(id: string) {
    return `../${id} `;
  }//end getRoute function

  async getSimilarMovies() {
    if (this.similarMovies.length == 0) {
      const loading = await this.loadingCtrl.create({
        message: 'Loading More...',
        spinner: 'circular',
      });
      await loading.present();

      this.page++;
      this.movieService
        .getSimilarMovies(this.movie.id, this.page)
        .subscribe((res) => {
          loading.dismiss();
          this.similarMovies = res.results;

          console.table(this.similarMovies);

          this.nextFiveSimilarMovies = this.similarMovies.splice(0, 5);

        });
    }//end if
  }//end getSimilarMovies function

  getFiveSimilarMovies() {

    this.getSimilarMovies();
    this.nextFiveSimilarMovies = this.similarMovies.splice(0, 5);
  }//end getFiveSimilarMovies function
}//end class

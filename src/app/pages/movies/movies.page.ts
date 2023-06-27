import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})//end component decorator

export class MoviesPage implements OnInit {
  movies:any[] = [];
  currentPage:number = 1;
  imageBaseUrl:string = environment.images;

  constructor(private movieService: MovieService, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.loadMovies();

  }//end ngOnInit function

  async loadMovies(event?: { target: { complete: () => void; }; } | undefined){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circular',
    });
    await loading.present();

    this.movieService.getCurrentPopularMovies(this.currentPage).subscribe(res => {
      loading.dismiss();
      this.movies = [...this.movies, ...res.results];
      console.log(res);

      event?.target.complete();
    })//end subscribe
  }//end loadMovies function

  loadMore(event: any | InfiniteScrollCustomEvent){
    //console.warn(event);
    this.currentPage++;
    this.loadMovies(event);
  }//end loadMore function

  

}//end class

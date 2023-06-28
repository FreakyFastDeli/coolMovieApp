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
  queryResults:any[] = [];
  currentPopularPage:number = 1;
  showSearch:boolean = false;
  imageBaseUrl:string = environment.images;

  constructor(private movieService: MovieService, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.loadMovies();

  }//end ngOnInit function

  async loadMovies(event?: any | undefined){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circular',
    });
    await loading.present();

    this.movieService.getCurrentPopularMovies(this.currentPopularPage).subscribe(res => {
      loading.dismiss();
      this.movies = [...this.movies, ...res.results];
      console.log(res);
      console.log("current popular movies^^");
      event?.target.complete();
    })//end subscribe
  }//end loadMovies function

  loadMore(event: any | InfiniteScrollCustomEvent){
    //console.warn(event);
    this.currentPopularPage++;
    this.loadMovies(event);
  }//end loadMore function

  toggleShowSearch(){
    this.showSearch = !this.showSearch;
  }//end toggleShowSearch function

  
  loadSearches(event?: any | undefined){
    let query = event.target.value;
    query = encodeURIComponent(query);
    this.movieService.getQueryResults(query).subscribe(res => {
      console.table(res.results);
      console.log("searched movie details^^");
      this.queryResults = res.results;
    })//end subscribe
  }//end loadSearches function


  

}//end class

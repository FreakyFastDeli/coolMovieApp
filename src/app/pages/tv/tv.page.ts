import { Component, OnInit } from '@angular/core';
import { TvService } from '../../services/tv.service';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.page.html',
  styleUrls: ['./tv.page.scss'],
})
export class TvPage implements OnInit {
  TV: any[] = [];
  queryResults: any[] = [];
  currentPopularPage: number = 1;
  imageBaseUrl: string = environment.images;
  constructor(
    private tvService: TvService,
    private loadingCtrl: LoadingController
  ) { }


  ngOnInit() {
    this.loadTV();
  }//end ngOnInit function
  
  async loadTV(event?: any | undefined) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circular',
    });
    await loading.present();

    this.tvService
    .getCurrentPopularTV(this.currentPopularPage)
    .subscribe(res => {
      loading.dismiss();
      this.TV = [...this.TV, ...res.results];
      console.log(res.results);
      console.log("current popular tv^^");
      event?.target.complete();
    })//end subscribe
  }//end loadTV function

  loadMore(event: any | InfiniteScrollCustomEvent) {
    //console.warn(event);
    this.currentPopularPage++;
    this.loadTV(event);
  }//end loadMore function
}//end class TvPage

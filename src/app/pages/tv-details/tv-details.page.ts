import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvService } from 'src/app/services/tv.service';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.page.html',
  styleUrls: ['./tv-details.page.scss'],
})
export class TvDetailsPage implements OnInit {
  protected tv: any = null;
  protected page: number = 1;
  protected similarTV: any[] = [];
  protected nextFiveSimilarTV: any[] = [];
  protected imageBaseUrl = environment.images;
  protected showSimilarTV = false;

  constructor(
    private route: ActivatedRoute,
    private tvService: TvService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.tvService.getTVDetails(id).subscribe((res) => {
      console.log(res);
      console.log("current selected tv details^^");
      this.tv = res;
    });
  }//end ngOnInit function
  
  openHomepage() {
    window.open(this.tv.homepage);
  }//end openHomepage function

  toggleSimilarTV() {
    this.showSimilarTV = !this.showSimilarTV;
    this.getSimilarTV();
  }//end toggleSimilarTV function

  getRoute(id: string) {
    return `../${id}`;
  }//end getRoute function

  async getSimilarTV() {
    if (this.similarTV.length == 0) {
      const loading = await this.loadingCtrl.create({
        message: 'Loading More...',
        spinner: 'circular',
      });
      await loading.present();

      this.page++;
      this.tvService
        .getSimilarTV(this.tv.id, this.page)
        .subscribe((res) => {
          loading.dismiss();
          this.similarTV = res.results;

          console.log(res.results);

          console.log("current similar tv^^");

          this.nextFiveSimilarTV = this.similarTV.splice(0, 5);
        });
    }//end if
  }//end getSimilarTV function

  getFiveSimilarTV() {

    this.getSimilarTV();
    this.nextFiveSimilarTV = this.similarTV.splice(0, 5);
  }//end getFiveSimilarTV function
}//end class TvDetailsPage

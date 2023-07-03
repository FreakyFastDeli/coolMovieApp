import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
  people: any[] = [];
  queryResults: any[] = [];
  currentPopularPage: number = 1;
  imageBaseUrl: string = environment.images;

  constructor(
    private peopleService: PeopleService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadPeople();
  }//end ngOnInit function

  async loadPeople(event?: any | undefined) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circular',
    });
    await loading.present();

    this.peopleService
    .getCurrentPopularPeople(this.currentPopularPage)
    .subscribe(res => {
      loading.dismiss();
      console.log(res);
      this.people.push(...res.results); //this.people = [...this.people, ...res.cast];
      console.log(res.results);
      console.log("current popular people^^");
      event?.target.complete();
    })//end subscribe
  }//end loadPeople function

  loadMore(event: any | InfiniteScrollCustomEvent) {
    //console.warn(event);
    this.currentPopularPage++;
    this.loadPeople(event);
  }//end loadMore function

}//end class PeoplePage
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from 'src/app/services/people.service';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.page.html',
  styleUrls: ['./people-details.page.scss'],
})
export class PeopleDetailsPage implements OnInit {
  protected people: any = null;
  protected page: number = 1;
  protected similarPeople: any[] = [];
  protected nextFiveSimilarPeople: any[] = [];
  protected imageBaseUrl = environment.images;
  protected showSimilarPeople = false;

  constructor(
    private route: ActivatedRoute,
    private peopleService: PeopleService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.peopleService.getPeopleDetails(id).subscribe((res) => {
      console.log(res);
      console.log("current selected people details^^");
      this.people = res;
    });
  }//end ngOnInit function

  openHomepage() {
    window.open(this.people.homepage);
  }//end openHomepage function

  toggleSimilarPeople() {
    this.showSimilarPeople = !this.showSimilarPeople;
    this.getSimilarPeople();
  }//end toggleSimilarPeople function

  getRoute(id: string) {
    return `../${id} `;
  }//end getRoute function

  async getSimilarPeople() {
    console.warn('getNextFiveSimilarPeople()');
    if (this.similarPeople.length == 0) {
      const loading = await this.loadingCtrl.create({
        message: 'Loading More...',
        spinner: 'circular',
      });
      await loading.present();

      this.page++;
      this.peopleService
        .getSimilarPeople(this.people.id, this.page)
        .subscribe((res) => {
          loading.dismiss();
          this.similarPeople = res.results;

          console.table(this.similarPeople);

          this.nextFiveSimilarPeople = this.similarPeople.splice(0, 5);

        });
    }
  }//end getSimilarPeople function

  getFiveSimilarPeople() {
    console.warn('getFiveSimilarPeople()');

    this.getSimilarPeople();
    this.nextFiveSimilarPeople = this.similarPeople.splice(0, 5);
  }//end getNextFiveSimilarPeople function

}

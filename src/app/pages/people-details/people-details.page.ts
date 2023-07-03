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
  protected peopleCredits: any[] = [];
  protected imageBaseUrl = environment.images;
  protected showPeopleCredits = false;

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

  togglePeopleCredits() {
    this.showPeopleCredits = !this.showPeopleCredits;
    this.getPeopleCredits();
  }//end toggleSimilarPeople function

  getRoute(creditedMovie: any) {
    console.log(creditedMovie.id);
    // creditedMovie.id = creditedMovie.id.toString();
    // creditedMovie.id = creditedMovie.id.slice(0, -3);
    // console.log(creditedMovie.id);
    return `../../movies/${creditedMovie.id}`;
  }//end getRoute function

  async getPeopleCredits() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading More...',
      spinner: 'circular',
    });
    await loading.present();

    this.page++;
    this.peopleService.getPeopleCredits(this.people.id).subscribe((res) => {
      loading.dismiss();
      console.log(res.cast);
      this.peopleCredits = res.cast;
      console.table(this.peopleCredits);
    });
  }//end getPeopleCredits function

}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleDetailsPage } from './people-details.page';

describe('PeopleDetailsPage', () => {
  let component: PeopleDetailsPage;
  let fixture: ComponentFixture<PeopleDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PeopleDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

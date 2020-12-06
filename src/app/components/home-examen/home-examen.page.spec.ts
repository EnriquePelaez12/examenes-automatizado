import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeExamenPage } from './home-examen.page';

describe('HomeExamenPage', () => {
  let component: HomeExamenPage;
  let fixture: ComponentFixture<HomeExamenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeExamenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeExamenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

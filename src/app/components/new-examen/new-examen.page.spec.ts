import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewExamenPage } from './new-examen.page';

describe('NewExamenPage', () => {
  let component: NewExamenPage;
  let fixture: ComponentFixture<NewExamenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExamenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewExamenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

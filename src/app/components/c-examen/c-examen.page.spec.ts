import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CExamenPage } from './c-examen.page';

describe('CExamenPage', () => {
  let component: CExamenPage;
  let fixture: ComponentFixture<CExamenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CExamenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CExamenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

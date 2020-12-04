import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatosExamenPage } from './datos-examen.page';

describe('DatosExamenPage', () => {
  let component: DatosExamenPage;
  let fixture: ComponentFixture<DatosExamenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosExamenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosExamenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

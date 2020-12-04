import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewCursoPage } from './new-curso.page';

describe('NewCursoPage', () => {
  let component: NewCursoPage;
  let fixture: ComponentFixture<NewCursoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCursoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

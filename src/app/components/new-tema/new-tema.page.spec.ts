import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewTemaPage } from './new-tema.page';

describe('NewTemaPage', () => {
  let component: NewTemaPage;
  let fixture: ComponentFixture<NewTemaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTemaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

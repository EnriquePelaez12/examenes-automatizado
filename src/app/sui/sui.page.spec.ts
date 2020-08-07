import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuiPage } from './sui.page';

describe('SuiPage', () => {
  let component: SuiPage;
  let fixture: ComponentFixture<SuiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

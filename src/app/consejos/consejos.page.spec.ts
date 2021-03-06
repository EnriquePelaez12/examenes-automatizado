import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ConsejosPage } from './consejos.page';

describe('ConsejosPage', () => {
  let component: ConsejosPage;
  let fixture: ComponentFixture<ConsejosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsejosPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsejosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

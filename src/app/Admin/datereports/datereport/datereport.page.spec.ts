import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatereportPage } from './datereport.page';

describe('DatereportPage', () => {
  let component: DatereportPage;
  let fixture: ComponentFixture<DatereportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatereportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatereportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

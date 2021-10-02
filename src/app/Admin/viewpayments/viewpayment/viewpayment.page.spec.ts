import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewpaymentPage } from './viewpayment.page';

describe('ViewpaymentPage', () => {
  let component: ViewpaymentPage;
  let fixture: ComponentFixture<ViewpaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewpaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

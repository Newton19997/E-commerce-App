import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForpaymentPage } from './forpayment.page';

describe('ForpaymentPage', () => {
  let component: ForpaymentPage;
  let fixture: ComponentFixture<ForpaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForpaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForpaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

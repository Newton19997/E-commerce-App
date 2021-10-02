import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserpaymentPage } from './userpayment.page';

describe('UserpaymentPage', () => {
  let component: UserpaymentPage;
  let fixture: ComponentFixture<UserpaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserpaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddqtydetailPage } from './addqtydetail.page';

describe('AddqtydetailPage', () => {
  let component: AddqtydetailPage;
  let fixture: ComponentFixture<AddqtydetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddqtydetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddqtydetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

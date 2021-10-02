import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddquantityPage } from './addquantity.page';

describe('AddquantityPage', () => {
  let component: AddquantityPage;
  let fixture: ComponentFixture<AddquantityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddquantityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddquantityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

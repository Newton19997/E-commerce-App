import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddcatagoryPage } from './addcatagory.page';

describe('AddcatagoryPage', () => {
  let component: AddcatagoryPage;
  let fixture: ComponentFixture<AddcatagoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcatagoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddcatagoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

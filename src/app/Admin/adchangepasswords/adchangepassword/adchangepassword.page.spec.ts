import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdchangepasswordPage } from './adchangepassword.page';

describe('AdchangepasswordPage', () => {
  let component: AdchangepasswordPage;
  let fixture: ComponentFixture<AdchangepasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdchangepasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdchangepasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

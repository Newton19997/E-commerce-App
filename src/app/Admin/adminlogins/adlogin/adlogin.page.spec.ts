import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdloginPage } from './adlogin.page';

describe('AdloginPage', () => {
  let component: AdloginPage;
  let fixture: ComponentFixture<AdloginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdloginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

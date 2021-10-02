import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocalBazzarPage } from './local-bazzar.page';

describe('LocalBazzarPage', () => {
  let component: LocalBazzarPage;
  let fixture: ComponentFixture<LocalBazzarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalBazzarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocalBazzarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

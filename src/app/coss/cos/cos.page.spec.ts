import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CosPage } from './cos.page';

describe('CosPage', () => {
  let component: CosPage;
  let fixture: ComponentFixture<CosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

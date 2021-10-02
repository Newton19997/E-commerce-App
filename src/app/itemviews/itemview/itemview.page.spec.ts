import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemviewPage } from './itemview.page';

describe('ItemviewPage', () => {
  let component: ItemviewPage;
  let fixture: ComponentFixture<ItemviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

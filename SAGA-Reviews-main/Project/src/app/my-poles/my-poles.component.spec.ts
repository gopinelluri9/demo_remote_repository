import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPolesComponent } from './my-poles.component';

describe('MyPolesComponent', () => {
  let component: MyPolesComponent;
  let fixture: ComponentFixture<MyPolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

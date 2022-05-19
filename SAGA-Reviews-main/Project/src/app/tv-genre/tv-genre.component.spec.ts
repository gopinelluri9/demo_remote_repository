import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvGenreComponent } from './tv-genre.component';

describe('TvGenreComponent', () => {
  let component: TvGenreComponent;
  let fixture: ComponentFixture<TvGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvGenreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

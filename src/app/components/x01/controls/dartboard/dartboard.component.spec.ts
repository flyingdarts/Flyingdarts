import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DartboardComponent } from './dartboard.component';

describe('DartboardComponent', () => {
  let component: DartboardComponent;
  let fixture: ComponentFixture<DartboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DartboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DartboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

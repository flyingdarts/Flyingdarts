import { ComponentFixture, TestBed } from '@angular/core/testing';

import { X01Component } from './x01.component';

describe('X01Component', () => {
  let component: X01Component;
  let fixture: ComponentFixture<X01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ X01Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(X01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

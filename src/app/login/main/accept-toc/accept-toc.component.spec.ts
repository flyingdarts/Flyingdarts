import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptTocComponent } from './accept-toc.component';

describe('AcceptTocComponent', () => {
  let component: AcceptTocComponent;
  let fixture: ComponentFixture<AcceptTocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptTocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

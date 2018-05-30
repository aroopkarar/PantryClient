import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescpritionComponent } from './descprition.component';

describe('DescpritionComponent', () => {
  let component: DescpritionComponent;
  let fixture: ComponentFixture<DescpritionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescpritionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescpritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

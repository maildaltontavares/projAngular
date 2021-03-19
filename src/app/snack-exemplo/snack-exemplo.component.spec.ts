import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackExemploComponent } from './snack-exemplo.component';

describe('SnackExemploComponent', () => {
  let component: SnackExemploComponent;
  let fixture: ComponentFixture<SnackExemploComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackExemploComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackExemploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

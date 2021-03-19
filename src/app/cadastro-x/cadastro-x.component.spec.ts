import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroXComponent } from './cadastro-x.component';

describe('CadastroXComponent', () => {
  let component: CadastroXComponent;
  let fixture: ComponentFixture<CadastroXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroXComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

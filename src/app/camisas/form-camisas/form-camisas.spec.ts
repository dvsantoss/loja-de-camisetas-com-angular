import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCamisas } from './form-camisas';

describe('FormCamisas', () => {
  let component: FormCamisas;
  let fixture: ComponentFixture<FormCamisas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCamisas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCamisas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

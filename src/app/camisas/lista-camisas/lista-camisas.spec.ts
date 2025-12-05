import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCamisas } from './lista-camisas';

describe('ListaCamisas', () => {
  let component: ListaCamisas;
  let fixture: ComponentFixture<ListaCamisas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCamisas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCamisas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

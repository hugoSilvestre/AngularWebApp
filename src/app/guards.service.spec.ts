import { TestBed } from '@angular/core/testing';


describe('GuardsService', () => {
  let service: GuardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComlinkWebWorkerComponent } from './comlink-web-worker.component';

describe('ComlinkWebWorkerComponent', () => {
  let component: ComlinkWebWorkerComponent;
  let fixture: ComponentFixture<ComlinkWebWorkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComlinkWebWorkerComponent]
    });
    fixture = TestBed.createComponent(ComlinkWebWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

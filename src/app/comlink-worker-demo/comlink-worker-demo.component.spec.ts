import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComlinkWorkerDemoComponent } from './comlink-worker-demo.component';

describe('ComlinkWebWorkerComponent', () => {
  let component: ComlinkWorkerDemoComponent;
  let fixture: ComponentFixture<ComlinkWorkerDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComlinkWorkerDemoComponent],
    });
    fixture = TestBed.createComponent(ComlinkWorkerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

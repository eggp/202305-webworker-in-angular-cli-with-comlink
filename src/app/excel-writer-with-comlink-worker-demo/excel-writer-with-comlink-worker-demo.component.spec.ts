import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelWriterWithComlinkWorkerDemoComponent } from './excel-writer-with-comlink-worker-demo.component';

describe('ExcelWriterWithComlinkWorkerDemoComponent', () => {
  let component: ExcelWriterWithComlinkWorkerDemoComponent;
  let fixture: ComponentFixture<ExcelWriterWithComlinkWorkerDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExcelWriterWithComlinkWorkerDemoComponent],
    });
    fixture = TestBed.createComponent(
      ExcelWriterWithComlinkWorkerDemoComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

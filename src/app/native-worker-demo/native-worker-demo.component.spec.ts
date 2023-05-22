import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NativeWorkerDemoComponent } from './native-worker-demo.component';

describe('SimpleWebWorkerComponent', () => {
  let component: NativeWorkerDemoComponent;
  let fixture: ComponentFixture<NativeWorkerDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NativeWorkerDemoComponent],
    });
    fixture = TestBed.createComponent(NativeWorkerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

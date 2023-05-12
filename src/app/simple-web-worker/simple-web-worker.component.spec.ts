import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleWebWorkerComponent } from './simple-web-worker.component';

describe('SimpleWebWorkerComponent', () => {
  let component: SimpleWebWorkerComponent;
  let fixture: ComponentFixture<SimpleWebWorkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SimpleWebWorkerComponent]
    });
    fixture = TestBed.createComponent(SimpleWebWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

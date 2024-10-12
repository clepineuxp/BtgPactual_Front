import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeTransactionComponent } from './unsubscribe-transaction.component';

describe('UnsubscribeTransactionComponent', () => {
  let component: UnsubscribeTransactionComponent;
  let fixture: ComponentFixture<UnsubscribeTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsubscribeTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnsubscribeTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

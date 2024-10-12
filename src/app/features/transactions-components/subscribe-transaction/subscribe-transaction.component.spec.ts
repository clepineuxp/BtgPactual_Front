import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeTransactionComponent } from './subscribe-transaction.component';

describe('SubscribeTransactionComponent', () => {
  let component: SubscribeTransactionComponent;
  let fixture: ComponentFixture<SubscribeTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribeTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscribeTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

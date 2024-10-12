import { ChangeDetectionStrategy, Component, viewChild, AfterViewInit, inject, ChangeDetectorRef } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FundService } from '../../core/services/fund-service';
import { ITransactionsDetailsResponse } from '../../core/models/response/ITransactionsDetailsResponse.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsComponent implements AfterViewInit {
  accordion = viewChild.required(MatAccordion);
  transactionDetails!:ITransactionsDetailsResponse;
  private _snackBar = inject(MatSnackBar);

  constructor(private fundService:FundService, private cdr: ChangeDetectorRef){
    this.loadTransactionsDetails();
  }

  async loadTransactionsDetails(){
    try {
      const response = await this.fundService.getDetailTransactions();  
      if (response) {
        if ('status' in response && response.status == 200){
          const parsedResponse = response as ITransactionsDetailsResponse
          this.transactionDetails = parsedResponse
          this.cdr.detectChanges();
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
  
  ngAfterViewInit() {
    this.accordion().closeAll()
  }

  async handleSubscribeResponse(event:boolean){
    if(event){
      await this.loadTransactionsDetails();
    }
  }
  async handleUnsubscribeResponse(event:boolean){
    if(event){
      await this.loadTransactionsDetails();
    }
  }
}

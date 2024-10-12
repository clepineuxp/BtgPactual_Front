import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges, ViewEncapsulation, inject, ChangeDetectorRef  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IFund } from '../../../core/models/response/ITransactionsDetailsResponse.model';
import { FundService } from '../../../core/services/fund-service';
import { SubscribeFundRequest } from '../../../core/models/request/SubscribeFundRequest.model';
import { ITransactionFundResponse } from '../../../core/models/response/ITransactionFundResponse.model';
import { SendTransactionComponent } from '../send-transaction/send-transaction.component';

@Component({
  selector: 'app-subscribe-transaction',
  templateUrl: './subscribe-transaction.component.html',
  styleUrl: './subscribe-transaction.component.scss',
  encapsulation: ViewEncapsulation.None, 
})
export class SubscribeTransactionComponent implements OnChanges {
  @Input() transactionData: any;

  @Output() onSubscribe = new EventEmitter<boolean>();

  private _snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['name', 'minimumAmount', 'category', 'amount', 'actions'];
  inputValues: string[] = [];
  dataSource: MatTableDataSource<any>;

  constructor(private fundService:FundService, private cdr: ChangeDetectorRef,private dialog: MatDialog){
    this.dataSource = new MatTableDataSource();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transactionData']) {
      const currentValue = changes['transactionData'].currentValue;
      this.onTransactionDataChanged(currentValue);
    }
    this.cdr.detectChanges();
  }

  onTransactionDataChanged(newData: any) {
    if(newData){
      this.dataSource = new MatTableDataSource(newData.availableFunds);
    }
  }

  async handleButtonClick(row: IFund, inputValue: string) {
    let request:SubscribeFundRequest = new SubscribeFundRequest("", row.id, +inputValue);
    const response = await this.fundService.subscribeTransactions(request)
    if(response && 'status' in response && 'message' in response){
      if(response.status == 200){
        this.onSubscribe.emit(true);
        const transactionSucces = response as ITransactionFundResponse
        this.openSubscribeModal(transactionSucces.transactionId, row.name)
      }
      this._snackBar.open(response.message, 'cerrar',{
        duration: 3000
      });
    }
  }
  
  openSubscribeModal(transactionId: string,fundName: string) {
    const dialogRef = this.dialog.open(SendTransactionComponent, {
      data: 
      { 
        transactionId: transactionId,
        fundName: fundName
      },
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Transaction unsubscribed successfully');
      } else {
        console.log('Transaction unsubscribing canceled');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

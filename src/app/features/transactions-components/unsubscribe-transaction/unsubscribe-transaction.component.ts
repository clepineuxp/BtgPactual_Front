import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter, inject, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FundService } from '../../../core/services/fund-service';
import { UnsubscribeFundRequest } from '../../../core/models/request/UnsubscribeFundRequest.model';
import { ITransactionItem } from '../../../core/models/response/ITransactionsHistoryResponse.model';

@Component({
  selector: 'app-unsubscribe-transaction',
  templateUrl: './unsubscribe-transaction.component.html',
  styleUrl: './unsubscribe-transaction.component.scss'
})
export class UnsubscribeTransactionComponent implements OnChanges {
  @Input() transactionData!: any;

  @Output() onUnsubscribe = new EventEmitter<boolean>();

  private _snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['fundName', 'amount', 'date', 'actions'];
  inputValues: string[] = [];
  dataSource: MatTableDataSource<any>;

  constructor(private fundService:FundService, private cdr: ChangeDetectorRef){
    this.dataSource = new MatTableDataSource();
  }

  onTransactionDataChanged(newData: any) {
    if(newData){
      this.dataSource = new MatTableDataSource(newData.activeTransactions);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transactionData']) {
      const currentValue = changes['transactionData'].currentValue;
      this.onTransactionDataChanged(currentValue);
    }
    this.cdr.detectChanges();
  }
  
  async handleButtonClick(row: ITransactionItem) {
    let request:UnsubscribeFundRequest = new UnsubscribeFundRequest("", row.fundId, row.id);
    const response = await this.fundService.unsubscribeTransactions(request)
    if(response && 'status' in response && 'message' in response){
      if(response.status == 200){
        this.onUnsubscribe.emit(true);
      }
      this._snackBar.open(response.message, 'cerrar',{
        duration: 3000
      });
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

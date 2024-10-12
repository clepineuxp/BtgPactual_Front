import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ITransactionItem, ITransactionsHistoryResponse } from '../../core/models/response/ITransactionsHistoryResponse.model';
import { FundService } from '../../core/services/fund-service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss'
})
export class TransactionHistoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'fundId', 'fundName', 'type', 'active', 'amount', 'date'];
  dataSource: MatTableDataSource<ITransactionItem>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fundService:FundService){
    this.dataSource = new MatTableDataSource();
    this.loadTransactions();
  }

  async loadTransactions(){
    try {
      const response = await this.fundService.getHistoryTransactions();  
      if (response) {
        if ('status' in response && response.status == 200){
          const transactionHistory = response as ITransactionsHistoryResponse
          this.dataSource = new MatTableDataSource(transactionHistory.transactions);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }else{
          
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

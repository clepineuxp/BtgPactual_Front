import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../features/home/home.component';
import { TransactionsComponent } from '../features/transactions/transactions.component';
import { TransactionHistoryComponent } from '../features/transaction-history/transaction-history.component';
import { CustomPaginatorIntl } from '../core/Extensions/CustomPaginatorIntl';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UnsubscribeTransactionComponent } from "../features/transactions-components/unsubscribe-transaction/unsubscribe-transaction.component";
import { SubscribeTransactionComponent } from "../features/transactions-components/subscribe-transaction/subscribe-transaction.component";
import { SendTransactionComponent } from '../features/transactions-components/send-transaction/send-transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TransactionsComponent,
    TransactionHistoryComponent,
    UnsubscribeTransactionComponent,
    SubscribeTransactionComponent,
    SendTransactionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatTableModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatCardModule
],
  exports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule, 
    MatSelectModule, 
    MatExpansionModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatCardModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },provideNativeDateAdapter()],
  bootstrap: [AppComponent]
})
export class SharedModule { }

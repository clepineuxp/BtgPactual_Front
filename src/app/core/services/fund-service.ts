import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../enviroments/environment";
import { AuthService } from "./auth-service";
import { StorageService } from "./storage-service";
import { ICustomerInfoResponse } from "../models/response/ICustomerInfoResponse.model";
import { lastValueFrom } from 'rxjs';
import { IGenericResponse } from "../models/response/IGenericResponse.model";
import { ITransactionsHistoryResponse } from "../models/response/ITransactionsHistoryResponse.model";
import { ITransactionsDetailsResponse } from "../models/response/ITransactionsDetailsResponse.model";
import { ITransactionFundResponse } from "../models/response/ITransactionFundResponse.model";
import { SubscribeFundRequest } from "../models/request/SubscribeFundRequest.model";
import { UnsubscribeFundRequest } from "../models/request/UnsubscribeFundRequest.model";


@Injectable({
  providedIn: 'root',
})

export class FundService{
  constructor(private http: HttpClient, private authService:AuthService, private storageService:StorageService){}

  async getHistoryTransactions():Promise<ITransactionsHistoryResponse | IGenericResponse>{
    try {
      const customer = this.storageService.get<ICustomerInfoResponse>(environment.storageTokens.customer);
      const url = `${environment.apiUrl}${environment.endpoints.getTransactionHistory}/${customer?.id}`;
      
      const response = await lastValueFrom(this.http.get<ITransactionsHistoryResponse | IGenericResponse>(url));
      if(response){
        return response;
      }
      return {
        status : 401,
        message: "Usuario no autorizado"
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return {
          status: error.error.status || 500,
          message: error.error?.message || 'Error no controlado en FundService.getHistoryTransactions'
        };
      }
      return {
          status: 500,
          message: 'Error no controlado en FundService.getHistoryTransactions'
      };
    }
  }

  async getDetailTransactions():Promise<ITransactionsDetailsResponse | IGenericResponse>{
    try {
      const customer = this.storageService.get<ICustomerInfoResponse>(environment.storageTokens.customer);
      const url = `${environment.apiUrl}${environment.endpoints.getTransactionDetails}/${customer?.id}`;
      
      const response = await lastValueFrom(this.http.get<ITransactionsDetailsResponse | IGenericResponse>(url));
      if(response){
        return response
      }
      return {
        status : 401,
        message: "Usuario no autorizado"
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return {
          status: error.error.status || 500,
          message: error.error?.message || 'Error no controlado en FundService.getDetailTransactions'
        };
      }
      return {
          status: 500,
          message: 'Error no controlado en FundService.getDetailTransactions'
      };
    }
  }

  async subscribeTransactions(request: SubscribeFundRequest):Promise<ITransactionFundResponse | IGenericResponse>{
    try {
      const customer = this.storageService.get<ICustomerInfoResponse>(environment.storageTokens.customer);
      const url = `${environment.apiUrl}${environment.endpoints.subscribeFund}`;
      request.customerId = customer!.id;
      const response = await lastValueFrom(this.http.post<ITransactionFundResponse | IGenericResponse>(url,request));
      if(response){
        return response
      }
      return {
        status : 401,
        message: "Usuario no autorizado"
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return {
          status: error.error.status || 500,
          message: error.error?.message || 'Error no controlado en FundService.subscribeTransactions'
        };
      }
      return {
          status: 500,
          message: 'Error no controlado en FundService.subscribeTransactions'
      };
    }
  }

  async unsubscribeTransactions(request: UnsubscribeFundRequest):Promise<ITransactionFundResponse | IGenericResponse>{
    try {
      const customer = this.storageService.get<ICustomerInfoResponse>(environment.storageTokens.customer);
      const url = `${environment.apiUrl}${environment.endpoints.unsubscribeFund}`;
      request.customerId = customer!.id;
      const response = await lastValueFrom(this.http.post<ITransactionFundResponse | IGenericResponse>(url,request));
      if(response){
        return response
      }
      return {
        status : 401,
        message: "Usuario no autorizado"
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return {
          status: error.error.status || 500,
          message: error.error?.message || 'Error no controlado en FundService.unsubscribeTransactions'
        };
      }
      return {
          status: 500,
          message: 'Error no controlado en FundService.unsubscribeTransactions'
      };
    }
  }

}
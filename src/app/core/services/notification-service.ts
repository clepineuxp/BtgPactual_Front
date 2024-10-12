import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { StorageService } from "./storage-service";
import { IGenericResponse } from "../models/response/IGenericResponse.model";
import { environment } from "../../enviroments/environment";
import { ICustomerInfoResponse } from "../models/response/ICustomerInfoResponse.model";
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class NotificationService{
  constructor(private http: HttpClient, private storageService:StorageService){}

  async sendNotifiactionEmail(transactionId:string, destination:string):Promise<IGenericResponse>{
    try {
      const customer = this.storageService.get<ICustomerInfoResponse>(environment.storageTokens.customer);
      const url = `${environment.apiUrl}${environment.endpoints.sendEmail}/${transactionId}/${customer?.id}/${destination}`;
      
      const response = await lastValueFrom(this.http.post<IGenericResponse>(url,NaN));
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
          message: error.error?.message || 'Error no controlado en NotificationService.sendNotifiactionEmail'
        };
      }
      return {
          status: 500,
          message: 'Error no controlado en NotificationService.sendNotifiactionEmail'
      };
    }
  }

  async sendNotifiactionSms(transactionId:string, destination:string):Promise<IGenericResponse>{
    try {
      const customer = this.storageService.get<ICustomerInfoResponse>(environment.storageTokens.customer);
      const url = `${environment.apiUrl}${environment.endpoints.sendSms}/${transactionId}/${customer?.id}/${destination}`;
      console.log(url);
      const response = await lastValueFrom(this.http.post<IGenericResponse>(url,NaN));
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
          message: error.error?.message || 'Error no controlado en NotificationService.sendNotifiactionSms'
        };
      }
      return {
          status: 500,
          message: 'Error no controlado en NotificationService.sendNotifiactionSms'
      };
    }
  }
}
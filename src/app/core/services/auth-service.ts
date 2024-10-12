import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICustomerInfoResponse } from "../models/response/ICustomerInfoResponse.model";
import { IGeneralEntityResponse } from "../models/response/IGeneralEntityResponse.model";
import { IGenericResponse } from "../models/response/IGenericResponse.model";
import { environment } from "../../enviroments/environment";
import { StorageService } from "./storage-service";
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService{
  constructor(private http: HttpClient, private storageService:StorageService) {}

  async login():Promise<ICustomerInfoResponse | IGenericResponse | undefined>{
    const url = `${environment.apiUrl}${environment.endpoints.getCustomer}`;
    try {
        const response = await lastValueFrom(this.http.get<ICustomerInfoResponse | IGenericResponse>(url));
        if(response){
          if ('id' in response){
            this.storageService.save(environment.storageTokens.customer,response);
            return response;
          }
        }
        return {
          status : 401,
          message: "Usuario No autorizado"
        }
    } catch (error) {
        if (error instanceof HttpErrorResponse) {
          return {
            status: error.status || 500,
            message: error.error?.message || 'Error no controlado en AuthService.login'
          };
        }
        return {
            status: 500,
            message: 'Error no controlado en AuthService.login'
        };
    }
  }

  async getCustomer():Promise<IGeneralEntityResponse | IGenericResponse | undefined>{
    try {
        let response = this.storageService.get<IGeneralEntityResponse | IGenericResponse | undefined>(environment.storageTokens.customer);
        if (response){
          return response;
        }
        return {
            status: 500,
            message: 'Usuario no autorizado'
        };
    } catch (error) {
        if (error instanceof HttpErrorResponse) {
          return {
            status: error.status || 500,
            message: error.error?.message || 'Error no controlado en AuthService.getCustomer'
          };
        }
        return {
            status: 500,
            message: 'Error no controlado en AuthService.getCustomer'
        };
    }
  }

}
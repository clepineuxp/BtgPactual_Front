import { IGeneralEntityResponse } from "../response/IGeneralEntityResponse.model";

export interface ICustomerInfoResponse extends IGeneralEntityResponse{
  name : string;
  balance : number;
}
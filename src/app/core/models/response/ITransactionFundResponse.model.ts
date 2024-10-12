import { IGenericResponse } from "./IGenericResponse.model";

export interface ITransactionFundResponse extends IGenericResponse{
  transactionId : string;
  newBalance : string;
}
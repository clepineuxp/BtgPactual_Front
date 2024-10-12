import { IGenericResponse } from "./IGenericResponse.model";

export interface ITransactionsHistoryResponse extends IGenericResponse{
  transactionsCount : string;
  transactions : ITransactionItem[];
}

export interface ITransactionItem{
  id : string;
  fundId : string;
  type : string;
  active? : boolean;
  amount : number;
  date : string;
  fundName : string;
}
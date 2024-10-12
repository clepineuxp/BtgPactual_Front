import { IGeneralEntityResponse } from "./IGeneralEntityResponse.model";
import { IGenericResponse } from "./IGenericResponse.model";
import { ITransactionItem } from "./ITransactionsHistoryResponse.model";

export interface ITransactionsDetailsResponse extends IGenericResponse{
  availableFunds : IFund[];
  activeTransactions : ITransactionItem[];
  balance : string;
  amountInvested: string;
}

export interface IFund extends IGeneralEntityResponse{
  name : string;
  minimumAmount : number;
  category : string;
}
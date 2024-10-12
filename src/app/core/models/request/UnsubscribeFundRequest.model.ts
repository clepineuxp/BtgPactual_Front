
export class UnsubscribeFundRequest {
  customerId : string;
  fundId : string;
  transactionId : string;

  constructor(customerId : string, fundId : string, transactionId : string){
    this.customerId = customerId;
    this.fundId = fundId;
    this.transactionId = transactionId;
  }
  
}
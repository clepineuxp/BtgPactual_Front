
export class SubscribeFundRequest {
  customerId : string;
  fundId : string;
  amount : number;

  constructor(customerId : string, fundId : string, amount : number){
    this.customerId = customerId;
    this.fundId = fundId;
    this.amount = amount;
  }
  
}
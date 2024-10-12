export const environment = {
  production: false,
  apiUrl: 'http://localhost:5278/api/v1',
  endpoints: {
    getCustomer: '/startup/get-customer',
    createInitialFunds: '/startup/create-initial-funds',
    verifyFunds: '/startup/verify-funds',
    getTransactionHistory: '/funds/get-transaction-history',
    getTransactionDetails: '/funds/get-transactions-details',
    unsubscribeFund: '/funds/unsubscribe-fund',
    subscribeFund: '/funds/subscribe-fund',
    sendEmail: '/notification/send-email',
    sendSms: '/notification/send-sms',

  },
  storageTokens:{
    customer: 'customer_token',
    customerAmmount: 'customer_amount_token'
  }
};
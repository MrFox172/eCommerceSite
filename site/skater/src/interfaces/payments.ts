interface Payment {
  id: number;
  accountId: number;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  createdate: string;
}

export type { Payment };

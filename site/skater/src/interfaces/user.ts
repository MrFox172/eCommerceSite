interface Address {
  id: number;
  accountId: number;
  recipientName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface Register {
  firstname: string;
  lastname: string;
  emailaddress: string;
  phonenumber: string;
  password: string;
}

interface Login {
  emailaddress: string;
  password: string;
}

interface SellerAccount {
  id: number;
  accountId: number;
  companyName: string;
  createdate: string;
};

interface Account {
  id: number;
  firstname: string;
  lastname: string;
  emailaddress: string;
  password: string; //consider making this a hash or encrypted.
  phonenumber: string;
  createdate: string;
  addresses: Address[];
  sellerAccount: SellerAccount;
}

export type { Address, Register, Login, SellerAccount, Account };
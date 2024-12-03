interface Address {
  accountId: number;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
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

interface Account {
  id: number;
  firstname: string;
  lastname: string;
  emailaddress: string;
  password: string; //consider making this a hash or encrypted.
  phonenumber: string;
  createdate: string;
  addresses: Address[];
  sellerAccount: string;
}

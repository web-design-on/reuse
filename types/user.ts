export type Address = {
  city: string;
  state: string;
  country: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  image: string;
  address: Address;
};
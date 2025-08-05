export interface User {
  id?: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  birthDate: string;
  cpf: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt?: Date;
  updatedAt?: Date;
}

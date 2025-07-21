import { Decimal } from "@prisma/client/runtime";

export interface Event {
  id: string;
  name: string;
  description: string;
  short_description: string
  date: Date
  location: string;
  address: string;
  price: Decimal
  id_category: number
  createdAt: Date;
  updatedAt: Date;
}

import { Order } from './order';

export class Customer {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;

  streetAddress: string;
  street2Address: String;
  city: string;
  state: string;
  zip: string;

  orders?: Array<Order>;
}

import { Order } from './order';

export class Customer {
  firstName: string;
  lastName: string;
  company: String;
  email: String;
  phone: String;

  streetAddress: string;
  street2Address: String;
  city: String;
  state: String;
  zip: String;

  orders?: Array<Order>;

}

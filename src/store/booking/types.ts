export interface Address {
  type: string;
  label: string;
  address_line_1: string;
  address_line_2: string;
  country: string;
  state: string;
  city: string;
  post_code: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  drivers_note: string;
}

interface ParcelItem {
  description: string;
  sku: string;
  quantity: number;
  weight: number;
  unit_weight: string;
  weight_unit: string;
  hs_code: string;
}

interface Parcel {
  items: ParcelItem[];
}

export interface LegDetail {
  from: string;
  to: string;
  price: number;
  amount: number;
  handlingFee: string;
  estimatedTime: number;
  legId: string;
  courier: string;
}
export interface AdditionalService {
  name: string;
  amount: number;
}

export interface Product_Details {
  id?: string; // Added this field
  product_book: string;
  product_code: string;
  product_type: string;
  product_details: string;
  product_weight: string;
  product_value: string;
  product_qty: string;
  print_type?: string;
}

export interface BookingState {
  service_id: string;
  sender_address: Address;
  recipient_address: Address;
  product_data: Product_Details[];
  additional_services: AdditionalService[];
  amount: number;
  parcel: Parcel[];
  leg_details: LegDetail[];
}

export type BookingFieldPayload = {
  field: string;
  value: any;
};

export type ParcelItemFieldPayload = {
  parcelIndex: number;
  itemIndex: number;
  field: keyof ParcelItem;
  value: any;
};

export type ProductDetailsPayload = Omit<Product_Details, 'id'> & { id?: string };

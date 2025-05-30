export interface Address {
  id: string;
  user_id: string;
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
  is_default: boolean;
  createdAt: string;
  updatedAt: string;
  is_sender_address: boolean;
}

export interface AddressResponse {
  success: boolean;
  data: Address[];
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

export interface ShipmentPayload {
  service_id: string;
  sender_address?: Address;
  recipient_address: Address;
  product_book: string;
  product_code: string;
  product_type: string;
  product_details: string;
  product_weight: string;
  product_value: string;
  product_qty: string;
  origin: string | undefined;
  origin_postcode: string | undefined;
  destination: string | undefined;
  destination_postcode: string | undefined;
  is_insured: boolean;
  has_protection: boolean;
  is_sign_required: boolean;
  print_type: string;
  amount: number;
  parcel: Parcel[];
}

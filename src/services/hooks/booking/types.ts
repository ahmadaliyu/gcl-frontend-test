export interface Address {
  country_iso: string;
  id: string;
  user_id: string;
  type: string;
  address_type: string;
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
  notes?: any;
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

export interface Shipment {
  id: string;
  user_id: string;
  service_id: string;
  sender_address_id: string;
  recipient_address_id: string;
  code: string;
  product_book: string;
  product_code: string;
  product_type: string;
  product_details: string;
  product_weight: string;
  product_value: string;
  product_qty: string;
  origin: string;
  origin_postcode: string;
  destination: string;
  destination_postcode: string;
  is_insured: boolean;
  has_protection: boolean;
  is_sign_required: boolean;
  print_type: string;
  amount: number;
  parcel: ParcelItem[];
  status:
    | 'In Transit'
    | 'Arrived at UK Office'
    | 'Cancelled'
    | 'Delivered'
    | 'Order Placed'
    | 'On Hold'
    | 'Clearance in Progress'
    | 'Paid';
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ShipmentResponse {
  success: boolean;
  data: Shipment[];
}

export interface BookingStatus {
  status: string;
  slug: string;
  comment: string;
  action: string | null;
  createdAt: string;
}

export interface BookingStatusResponse {
  success: boolean;
  resp: BookingStatus[];
}

export interface PaymentResData {
  success: boolean;
  resp: Payment[];
}

export interface Payment {
  id: string;
  user_id: string;
  booking_id: string;
  amount: string;
  payment_type: 'booking' | string;
  status: 'paid' | 'unpaid' | 'pending' | string;
  session_id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  Booking: {
    id: string;
    code: string;
  };
}

export interface PaymentByIdRes {
  success: boolean;
  resp: Payment;
}

export interface BookingNote {
  id: string;
  booking_id: string;
  note: string;
  type: 'booking';
  createdAt: string; // ISO 8601 date string
  updatedAt: string;
}
export interface BookingNotesResponse {
  success: boolean;
  resp: BookingNote[];
}

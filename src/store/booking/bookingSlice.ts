import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingFieldPayload, BookingState, ParcelItemFieldPayload, LegDetail } from './types';

const initialState: BookingState = {
  service_id: '',
  sender_address: {
    type: '',
    label: '',
    address_line_1: '',
    address_line_2: '',
    country: '',
    state: '',
    city: '',
    post_code: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    drivers_note: '',
  },
  recipient_address: {
    type: '',
    label: '',
    address_line_1: '',
    address_line_2: '',
    country: '',
    state: '',
    city: '',
    post_code: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    drivers_note: '',
  },
  product_book: '',
  product_code: '',
  product_type: '',
  product_details: '',
  product_weight: '',
  product_value: '',
  product_qty: '',
  is_insured: false,
  has_protection: false,
  is_sign_required: false,
  print_type: 'home',
  amount: 0,
  parcel: [
    {
      items: [
        {
          description: '',
          sku: '',
          quantity: 1,
          weight: 1,
          unit_weight: '1',
          weight_unit: 'kg',
          hs_code: '',
        },
      ],
    },
  ],
  leg_details: [
    {
      from: '',
      to: '',
      price: 0,
      amount: 0,
      handlingFee: '',
      estimatedTime: 0,
      legId: '',
      courier: '',
    },
  ],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    updateBookingField: (state, action: PayloadAction<BookingFieldPayload>) => {
      const { field, value } = action.payload;

      if (field in state) {
        (state as any)[field] = value;
      } else if (field.startsWith('sender_address.')) {
        const key = field.replace('sender_address.', '');
        if (key in state.sender_address) {
          (state.sender_address as any)[key] = value;
        }
      } else if (field.startsWith('recipient_address.')) {
        const key = field.replace('recipient_address.', '');
        if (key in state.recipient_address) {
          (state.recipient_address as any)[key] = value;
        }
      }
    },
    // updateOriginOrDestination: (state, action: PayloadAction<LocationUpdatePayload>) => {
    //   const { target, data } = action.payload;

    //   if (target === 'origin') {
    //     state.origin = { ...state.origin, ...data };
    //   } else if (target === 'destination') {
    //     state.destination = { ...state.destination, ...data };
    //   }
    // },

    updateParcelItemField: (state, action: PayloadAction<ParcelItemFieldPayload>) => {
      const { parcelIndex, itemIndex, field, value } = action.payload;
      if (state.parcel[parcelIndex] && state.parcel[parcelIndex].items[itemIndex]) {
        (state.parcel[parcelIndex].items[itemIndex] as any)[field] = value;
      }
    },

    setLegDetails: (state, action: PayloadAction<LegDetail[]>) => {
      state.leg_details = action.payload;
    },

    resetBooking: () => initialState,
  },
});

export const { updateBookingField, updateParcelItemField, setLegDetails, resetBooking } = bookingSlice.actions;

export default bookingSlice.reducer;

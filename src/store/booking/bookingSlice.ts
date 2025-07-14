import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BookingFieldPayload,
  BookingState,
  ParcelItemFieldPayload,
  LegDetail,
  ProductDetailsPayload,
  Product_Details,
  AdditionalService,
} from './types';

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
  amount: 0,
  product_data: [],
  additional_services: [],
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

    addProduct: (state, action: PayloadAction<ProductDetailsPayload>) => {
      const id = Date.now().toString();
      const newProduct = {
        ...action.payload,
        id,
      };
      state.product_data.push(newProduct);
    },

    updateProduct: (state, action: PayloadAction<Product_Details>) => {
      const index = state.product_data.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.product_data[index] = action.payload;
      }
    },

    deleteProduct: (state, action: PayloadAction<string>) => {
      state.product_data = state.product_data.filter((product) => product.id !== action.payload);
    },

    replaceProductData: (state, action: PayloadAction<Product_Details[]>) => {
      state.product_data = action.payload;
    },

    addAdditionalService: (state, action: PayloadAction<AdditionalService>) => {
      const exists = state.additional_services.some((service) => service.name === action.payload.name);
      if (!exists) {
        state.additional_services.push(action.payload);
      }
    },

    removeAdditionalService: (state, action: PayloadAction<{ name: string }>) => {
      state.additional_services = state.additional_services.filter((service) => service.name !== action.payload.name);
    },

    clearAdditionalServices: (state) => {
      state.additional_services = [];
    },

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

export const {
  updateBookingField,
  updateParcelItemField,
  setLegDetails,
  resetBooking,
  addProduct,
  updateProduct,
  deleteProduct,
  replaceProductData,
  addAdditionalService,
  removeAdditionalService,
  clearAdditionalServices,
} = bookingSlice.actions;

export default bookingSlice.reducer;

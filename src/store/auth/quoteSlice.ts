import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address, ShipmentState } from './types';

const initialState: ShipmentState = {
  shipment: {
    ship_from: {
      name: '',
      postcode: '',
      country_iso: '',
    },
    ship_to: {
      name: '',
      postcode: '',
      country_iso: '',
    },
    parcels: [
      {
        description: '',
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
    despatch_date: new Date().toISOString(), // ✅ Store as ISO string
  },
};

const shipmentSlice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {
    updateShipFrom: (state, action: PayloadAction<Partial<Address>>) => {
      state.shipment.ship_from = { ...state.shipment.ship_from, ...action.payload };
    },
    updateShipTo: (state, action: PayloadAction<Partial<Address>>) => {
      state.shipment.ship_to = { ...state.shipment.ship_to, ...action.payload };
    },
    updateDespatchDate: (state, action: PayloadAction<string>) => {
      state.shipment.despatch_date = action.payload; // ✅ Expect ISO string
    },
    addOrUpdateItemInParcel: (
      state,
      action: PayloadAction<{
        parcelIndex: number;
        itemIndex: number;
        item: {
          description?: string;
          sku?: string;
          quantity?: number;
          weight?: number;
          unit_weight?: string;
          weight_unit?: string;
          hs_code?: string;
        };
        description?: string;
      }>
    ) => {
      const { parcelIndex, itemIndex, item, description } = action.payload;
      const parcel = state.shipment.parcels[parcelIndex];

      if (!parcel || !parcel.items[itemIndex]) return;

      if (description !== undefined) {
        parcel.description = description;
      }

      parcel.items[itemIndex] = {
        ...parcel.items[itemIndex],
        ...item,
      };
    },
    clearQuotesData: (state) => {
      return initialState;
    },
  },
});

export const { updateShipFrom, updateShipTo, updateDespatchDate, addOrUpdateItemInParcel, clearQuotesData } =
  shipmentSlice.actions;

export default shipmentSlice.reducer;

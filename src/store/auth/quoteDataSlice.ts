import { QuotesResponse } from '@/services';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuoteState {
  quote: QuotesResponse | null;
}

const initialState: QuoteState = {
  quote: null,
};

const quoteDataSlice = createSlice({
  name: 'quoteData',
  initialState,
  reducers: {
    loadQuotes(state, action: PayloadAction<QuotesResponse>) {
      state.quote = action.payload;
    },

    clearQuote(state) {
      state.quote = null;
    },
  },
});

export const { loadQuotes, clearQuote } = quoteDataSlice.actions;

export default quoteDataSlice.reducer;

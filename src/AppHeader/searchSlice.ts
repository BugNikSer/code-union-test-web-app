import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IRestaurant } from "../Restaurants/types";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    keyword: "",
    page: 0,
    perPage: 10,
    result: [] as IRestaurant[] | null,
    error: null as Error | null,
    isLoading: false,
  },
  reducers: {
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
    addResult: (state, action: PayloadAction<IRestaurant[]>) => {
      state.isLoading = false;
      state.error = null;
      state.result = state.result
        ? [...state.result, ...action.payload]
        : action.payload;
    },
    setIsLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.result = null;
    },
  },
});

export interface ISearchSlice {
  keyword: string;
  page: number;
  perPage: number;
  result: IRestaurant[] | null;
  error: Error | null;
  isLoading: boolean;
}

export const {
  setKeyword,
  setPage,
  setPerPage,
  setError,
  setIsLoading,
  addResult,
} = searchSlice.actions;
export default searchSlice.reducer;

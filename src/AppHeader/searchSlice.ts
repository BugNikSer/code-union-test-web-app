import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IRestaurant } from "../Restaurants/types";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    keyword: "",
    page: 1,
    perPage: 10,
    restaurants: null as IRestaurant[] | null,
    restaurantsCount: 0,
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
    setRestaurants: (
      state,
      action: PayloadAction<{
        restaurants: IRestaurant[] | null;
        count: number;
      }>
    ) => {
      const { restaurants, count } = action.payload;
      state.isLoading = false;
      state.error = null;
      state.restaurants = restaurants;
      state.restaurantsCount = count;
    },
    setIsLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.restaurants = null;
      state.restaurantsCount = 0;
    },
  },
});

export interface ISearchSlice {
  keyword: string;
  page: number;
  perPage: number;
  restaurants: IRestaurant[] | null;
  restaurantsCount: number;
  error: Error | null;
  isLoading: boolean;
}

export const {
  setKeyword,
  setPage,
  setPerPage,
  setError,
  setIsLoading,
  setRestaurants,
} = searchSlice.actions;
export default searchSlice.reducer;

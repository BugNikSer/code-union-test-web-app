import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: "",
  },
  reducers: {
    setSearch: (state, action) => {
      state.value = action.payload;
    },
  },
});

export interface ISearchSlice {
  value: string;
}

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;

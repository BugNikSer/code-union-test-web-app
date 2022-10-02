import type { IAuthenticationSlice } from "../Authentication/AuthenticationSlice";
import type { ISearchSlice } from "../AppHeader/searchSlice";

export interface IStore {
  authentication: IAuthenticationSlice;
  search: ISearchSlice;
}

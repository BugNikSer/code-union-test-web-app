import { IAuthenticationSlice } from "../Authentication/AuthenticationSlice";

export interface IStore {
  authentication: IAuthenticationSlice;
}
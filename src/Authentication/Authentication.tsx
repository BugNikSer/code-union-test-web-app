import React, { useEffect } from "react";
import type { FC } from "react";
import { useSelector } from "react-redux";
import { auth } from "../api";
import type { IStore } from "../redux/types";

export const Authenticaction: FC = () => {
  const authData = useSelector((state: IStore) => state.authentication);

  const data = {
    email: "123@goga.com",
    password: "youlneverguesit",
  };

  auth(data);

  return <div>hi</div>;
};

import React, { useState, useEffect } from "react";
import type { FC } from "react";
import { useSelector } from "react-redux";
import { AppBar, Container, Stack } from "@mui/material";
import { auth } from "../api";
import type { IStore } from "../redux/types";
import AppHeader from "../AppHeader";

export const Authenticaction: FC = () => {
  const [isLoginModalisplay, setLoginModalDisplay] = useState<boolean>(false);
  const [isRegisterModalDisplay, setRegisterModalDisplay] =
    useState<boolean>(false);
  const { tokens, user } = useSelector((state: IStore) => state.authentication);

  // useEffect(() => {
  //   if (!tokens.accessToken && !tokens.refreshToken) {
  //     setLoginModalisplays(true);
  //   }
  // }, [tokens.accessToken, tokens.refreshToken]);

  // const data = {
  //   email: "123@goga.com",
  //   password: "youlneverguesit",
  // };

  // auth(data);

  return (
    <Container sx={{ width: "100%", height: "100%" }}>
      <AppHeader
        setLoginModalDisplay={setLoginModalDisplay}
        setRegisterModalDisplay={setRegisterModalDisplay}
      />
    </Container>
  );
};

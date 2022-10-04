import React, { useState, useEffect } from "react";
import type { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Stack, Typography } from "@mui/material";
import { auth } from "../api";
import { setTokens, setUser } from "./AuthenticationSlice";
import type { IStore } from "../redux/types";
import AppHeader from "../AppHeader";
import RestaurantsContainer from "../Restaurants";
import { LoginModal } from "./LoginModal";

// const data = {
//   email: "123@goga.com",
//   password: "youlneverguesit",
// };

export const Authenticaction: FC = () => {
  const dispatch = useDispatch();
  const [isLoginModalisplay, setLoginModalDisplay] = useState<boolean>(true);
  const [isRegisterModalDisplay, setRegisterModalDisplay] =
    useState<boolean>(false);
  const { tokens, user } = useSelector((state: IStore) => state.authentication);
  const { accessToken } = tokens;
  const { email, id, nickname } = user;
  console.log("id", id);

  // useEffect(() => {
  //   if (!accessToken) {
  //     console.log("start fetching");
  //     auth(data).then((resp) => {
  //       console.log("auth response", resp);
  //       if (resp) {
  //         // dispatch(setTokens(resp.tokens));
  //         // dispatch(setUser(resp.user));
  //       }
  //     });
  //   }
  // }, [id]);

  return (
    <Container sx={{ width: "100%", height: "100%", padding: "0!important" }}>
      <AppHeader
        setLoginModalDisplay={setLoginModalDisplay}
        setRegisterModalDisplay={setRegisterModalDisplay}
      />
      {id ? (
        <RestaurantsContainer />
      ) : (
        <Stack sx={{ alignItems: "center", justifyContent: "center", mt: 2 }}>
          <Typography>Войдите или зарегистрируйтесь</Typography>
        </Stack>
      )}
      <LoginModal
        isLoginModalisplay={isLoginModalisplay}
        setLoginModalDisplay={setLoginModalDisplay}
        setRegisterModalDisplay={setRegisterModalDisplay}
      />
    </Container>
  );
};

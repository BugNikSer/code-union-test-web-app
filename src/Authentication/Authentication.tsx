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
import { RegisterModal } from "./RegistrationModal";

// const data = {
//   email: "123@goga.com",
//   password: "youlneverguesit",
// };

export const Authenticaction: FC = () => {
  const [isLoginModalDisplay, setLoginModalDisplay] = useState<boolean>(true);
  const [isRegisterModalDisplay, setRegisterModalDisplay] =
    useState<boolean>(false);
  const { user } = useSelector((state: IStore) => state.authentication);
  const { id } = user;

  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        padding: "0!important",
        maxWidth: "unset!important",
      }}
    >
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
        isLoginModalDisplay={isLoginModalDisplay}
        setLoginModalDisplay={setLoginModalDisplay}
        setRegisterModalDisplay={setRegisterModalDisplay}
      />
      <RegisterModal
        isRegisterModalDisplay={isRegisterModalDisplay}
        setLoginModalDisplay={setLoginModalDisplay}
        setRegisterModalDisplay={setRegisterModalDisplay}
      />
    </Container>
  );
};

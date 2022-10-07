import React, { useState, useEffect } from "react";
import type { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Stack, Typography, useTheme } from "@mui/material";
import { refreshToken, getProfile } from "../api";
import { setTokens, setUser } from "./AuthenticationSlice";
import type { IStore } from "../redux/types";
import AppHeader from "../AppHeader";
import RestaurantsContainer from "../Restaurants";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegistrationModal";
import { setRefreshToCookies } from "./tools";

export const Authenticaction: FC = () => {
  const { user } = useSelector((state: IStore) => state.authentication);
  const { id } = user;
  const [isLoginModalDisplay, setLoginModalDisplay] = useState<boolean>(true);
  const [isRegisterModalDisplay, setRegisterModalDisplay] =
    useState<boolean>(false);

  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (!id) {
      const token = document.cookie;
      if (token) {
        refreshToken(token).then((tokensRes) => {
          if (tokensRes.tokens) {
            setRefreshToCookies(tokensRes.tokens.refreshToken);

            dispatch(setTokens(tokensRes.tokens));
            getProfile(tokensRes.tokens.accessToken).then((userRes) => {
              if (userRes.id) {
                dispatch(setUser(userRes));
              }
            });
          }
        });
      }
    }
  }, [id]);

  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        padding: "0!important",
        maxWidth: "unset!important",
        bgcolor: theme.palette.grey[100],
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
        isLoginModalDisplay={isLoginModalDisplay && id === null}
        setLoginModalDisplay={setLoginModalDisplay}
        setRegisterModalDisplay={setRegisterModalDisplay}
      />
      <RegisterModal
        isRegisterModalDisplay={isRegisterModalDisplay && id === null}
        setLoginModalDisplay={setLoginModalDisplay}
        setRegisterModalDisplay={setRegisterModalDisplay}
      />
    </Container>
  );
};

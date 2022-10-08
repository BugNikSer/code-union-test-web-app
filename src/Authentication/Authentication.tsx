import React, { useState, useEffect } from "react";
import type { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";
import { refreshToken, getProfile } from "../api";
import { setTokens, setUser } from "./AuthenticationSlice";
import type { IStore } from "../redux/types";
import AppHeader from "../AppHeader";
import RestaurantsContainer from "../Restaurants";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegistrationModal";
import { setRefreshToCookies } from "../tools";

export const Authenticaction: FC = () => {
  const { user } = useSelector((state: IStore) => state.authentication);
  const { id } = user;
  const [isLoginModalDisplay, setLoginModalDisplay] = useState<boolean>(true);
  const [isRegisterModalDisplay, setRegisterModalDisplay] =
    useState<boolean>(false);
  const [refreshTimeout, setRefreshTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const dispatch = useDispatch();

  function fetchRefresh() {
    // токен из cookies
    const token = document.cookie;

    if (token) {
      refreshToken(token).then((tokensRes) => {
        // если токены пришли
        if (tokensRes.tokens) {
          // запись в cookies
          setRefreshToCookies(tokensRes.tokens.refreshToken);
          // запись в редакс
          dispatch(setTokens(tokensRes.tokens));

          // очистка таймера
          if (refreshTimeout) {
            clearTimeout(refreshTimeout);
          }

          // silent-refresh каждые 14 минут
          setRefreshTimeout(
            setTimeout(() => {
              fetchRefresh();
            }, 14 * 60000)
          );

          // запрос данных пользователя
          getProfile(tokensRes.tokens.accessToken).then((userRes) => {
            if (userRes.id) {
              dispatch(setUser(userRes));
            }
          });
        } else {
          console.error(tokensRes);
        }
      });
    }
  }

  // логин по refreshToken при открытии
  useEffect(() => {
    if (!id) {
      fetchRefresh();
    }

    return () => {
      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
      }
    };
  }, [id]);

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
      <RestaurantsContainer />
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

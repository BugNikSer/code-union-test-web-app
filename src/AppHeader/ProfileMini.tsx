import React, { useState, MouseEvent } from "react";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { IStore } from "../redux/types";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Popover,
  Typography,
} from "@mui/material";
import { AccountCircle, Close } from "@mui/icons-material";
import { theme } from "../theme";
import { logout } from "../Authentication/AuthenticationSlice";
import { setRestaurants, setPage } from "./searchSlice";
import { setRefreshToCookies } from "../tools";

interface IProfileMiniProps {
  setLoginModalDisplay: (isDisplay: boolean) => void;
  setRegisterModalDisplay: (isDisplay: boolean) => void;
}

export const ProfileMini: FC<IProfileMiniProps> = ({
  setLoginModalDisplay,
  setRegisterModalDisplay,
}) => {
  const [modalAnchorEl, setModalAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  // редакс
  const { user } = useSelector((store: IStore) => store.authentication);
  // утилиты
  const dispatch = useDispatch();

  if (user.id) {
    // пользователь авторизован
    return (
      <Stack direction="row" spacing={1}>
        {/* Никнэйм */}
        <Typography
          sx={{
            color: theme.palette.info.main,
            display: "flex",
            alignItems: "center",
          }}
        >
          {user.nickname}
        </Typography>
        {/* аватарка */}
        <IconButton
          color="info"
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            setModalAnchorEl(event.currentTarget);
          }}
        >
          <AccountCircle />
        </IconButton>
        {/* модалка */}
        <Popover
          open={Boolean(modalAnchorEl)}
          anchorEl={modalAnchorEl}
          onClose={() => {
            setModalAnchorEl(null);
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <AppBar sx={{ position: "relative", p: 2, borderRadius: 0 }}>
            <Stack direction="row" spacing={2}>
              <Typography
                sx={{ display: "flex", flex: 1, alignItems: "center" }}
              >
                Управление аккаунтом
              </Typography>
              <IconButton
                onClick={() => {
                  setModalAnchorEl(null);
                }}
                color="error"
              >
                <Close />
              </IconButton>
            </Stack>
          </AppBar>
          <Stack sx={{ p: 2 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setRefreshToCookies(
                  "notoken; expires=Thu, 01 Jan 1970 00:00:01 UTC"
                );
                dispatch(setRestaurants({ restaurants: null, count: 0 }));
                dispatch(logout());
                setModalAnchorEl(null);
              }}
            >
              Выйти
            </Button>
          </Stack>
        </Popover>
      </Stack>
    );
  } else {
    // Пользователь не авторизован
    return (
      <Stack direction="row" spacing={1}>
        <Button
          variant="text"
          onClick={() => {
            setRegisterModalDisplay(true);
          }}
        >
          Регистрация
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setLoginModalDisplay(true);
          }}
        >
          Войти
        </Button>
      </Stack>
    );
  }
};

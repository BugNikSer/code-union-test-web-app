import React from "react";
import type { FC, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { setSearch } from "./searchSlice";
import type { IStore } from "../redux/types";

interface AppHeaderProps {
  setLoginModalDisplay: (isDisplay: boolean) => void;
  setRegisterModalDisplay: (isDisplay: boolean) => void;
}

export const AppHeader: FC<AppHeaderProps> = ({
  setLoginModalDisplay,
  setRegisterModalDisplay,
}) => {
  const theme = useTheme();
  const greyColor = theme.palette.grey[400];
  const dispatch = useDispatch();
  const { value } = useSelector((state: IStore) => state.search);

  return (
    <AppBar>
      <Toolbar
        sx={{
          bgcolor: theme.palette.common.white,
          paddingLeft: "10vw!important",
          paddingRight: "5vw!important",
        }}
      >
        <Typography sx={{ flex: 1, color: greyColor }} variant="h6">
          Главная
        </Typography>
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
      </Toolbar>
      <Stack
        sx={{
          width: "90vw",
          ml: "5vw",
          mr: "5vw",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ width: "60%", mt: 3 }}>
          Найти лучшее предложение от ресторана
        </Typography>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            justifySelf: "stretch",
            bgcolor: theme.palette.common.white,
            borderRadius: "10px",
            pt: 3,
            pr: 3,
            pl: 3,
            pb: 3,
            mt: 3,
            mb: 3,
          }}
        >
          <TextField
            variant="outlined"
            sx={{
              bgcolor: theme.palette.common.white,
              width: "50%",
            }}
            placeholder="Город, адрес, шоссе или ЖК"
            value={value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch(setSearch(event.target.value));
            }}
          />
          <Button variant="contained" size="large">
            Найти
          </Button>
        </Stack>
      </Stack>
    </AppBar>
  );
};

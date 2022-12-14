import React, { useEffect } from "react";
import type { FC, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import {
  setKeyword,
  setError,
  setIsLoading,
  setRestaurants,
  setPage,
} from "./searchSlice";
import type { IStore } from "../redux/types";
import { getAllRestaurants } from "../api";
import { ProfileMini } from "./ProfileMini";

interface AppHeaderProps {
  setLoginModalDisplay: (isDisplay: boolean) => void;
  setRegisterModalDisplay: (isDisplay: boolean) => void;
}

export const AppHeader: FC<AppHeaderProps> = ({
  setLoginModalDisplay,
  setRegisterModalDisplay,
}) => {
  // утилиты
  const theme = useTheme();
  const dispatch = useDispatch();
  // редакс
  // const { tokens, user } = useSelector((state: IStore) => state.authentication);
  const { keyword /*, page, perPage*/ } = useSelector(
    (state: IStore) => state.search
  );
  // цвет из темы
  const greyColor = theme.palette.grey[400];

  return (
    <AppBar sx={{ position: "relative" }}>
      {/* Header */}
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
        <ProfileMini
          setLoginModalDisplay={setLoginModalDisplay}
          setRegisterModalDisplay={setRegisterModalDisplay}
        />
      </Toolbar>
      {/* Search */}
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
              width: "100%",
            }}
            placeholder="Город, адрес, шоссе или ЖК"
            value={keyword}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch(setKeyword(event.target.value));
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          {/* <Button variant="contained" size="large" onClick={fetchRestaurants}>
            Найти
          </Button> */}
        </Stack>
      </Stack>
    </AppBar>
  );
};

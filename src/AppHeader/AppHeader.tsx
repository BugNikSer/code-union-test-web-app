import React, { useEffect } from "react";
import type { FC, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Button,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { setKeyword, setError, setIsLoading, addResult } from "./searchSlice";
import type { IStore } from "../redux/types";
import { getAllRestaurants } from "../api";
import { store } from "../redux/store";

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
  const { keyword, page, perPage } = useSelector(
    (state: IStore) => state.search
  );
  const { tokens } = useSelector((state: IStore) => state.authentication);

  // useEffect(() => {
  //   getAllRestaurants({
  //     req: { keyword, page, perPage },
  //     token: tokens.accessToken || "",
  //   })
  //     .then((res) => {
  //       console.log("result");
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.error("Custom error catch");
  //       console.error(error);
  //     });
  // }, [tokens.accessToken]);

  const handleSearchBtnClick = () => {
    getAllRestaurants({
      req: { keyword, page, perPage },
      token: tokens.accessToken || "",
    }).then((res) => {
      console.log("result");
      console.log(res);
    });
  };

  return (
    <AppBar sx={{ position: "relative" }}>
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
            value={keyword}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch(setKeyword(event.target.value));
            }}
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleSearchBtnClick}
          >
            Найти
          </Button>
        </Stack>
      </Stack>
    </AppBar>
  );
};

import React, { useState } from "react";
import type { FC, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setUser, setTokens } from "./AuthenticationSlice";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  FormHelperText,
  Slide,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { TransitionProps } from "@mui/material/transitions";
import { auth } from "../api";
import type { ILoginProps } from "../api";

interface ILoginModalProps {
  isLoginModalisplay: boolean;
  setLoginModalDisplay: (isDisplay: boolean) => void;
  setRegisterModalDisplay: (isDisplay: boolean) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const LoginModal: FC<ILoginModalProps> = ({
  isLoginModalisplay,
  setLoginModalDisplay,
  setRegisterModalDisplay,
}) => {
  // Хранение полей ввода
  const [login, setLogin] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  // Состояния запроса
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Утилиты
  const theme = useTheme();
  const dispatch = useDispatch();
  // Обработчик
  const handleLoginClick = () => {
    const data: ILoginProps = {
      password: password as string,
    };

    if (isLoginEmail) {
      data.email = login as string;
    } else {
      data.nickname = login as string;
    }
    setLoading(true);
    auth(data)
      .then((res) => {
        if (Object.keys(res).includes("tokens")) {
          dispatch(setTokens(res.tokens));
          dispatch(setUser(res.user));
          setLoginModalDisplay(false);
        } else {
          setError(res.message);
        }
      })
      .catch((e) => {
        setError(e.name);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Соответствует ли логин формату email
  const isLoginEmail = login && login.match(/^[\w-.]+@([\w-.]+\.)+[\w-]{2,4}$/);

  return (
    <Dialog
      open={isLoginModalisplay}
      onClose={() => setLoginModalDisplay(false)}
      TransitionComponent={Transition}
    >
      <DialogTitle>Войти</DialogTitle>
      <DialogContent>
        <Stack sx={{ pt: "20px!important" }} spacing={1}>
          <FormControl error={login !== null && login.length === 0}>
            <TextField
              color="info"
              required
              value={login || ""}
              label={isLoginEmail ? "EMail" : "EMail или логин"}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setLogin(event.target.value);
                setError(null);
              }}
            />
            <FormHelperText>
              {login !== null && login.length === 0
                ? "Поле не должно быть пустым"
                : ""}
            </FormHelperText>
          </FormControl>
          <FormControl error={password !== null && password.length === 0}>
            <TextField
              color="info"
              required
              value={password || ""}
              label="Пароль"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
                setError(null);
              }}
            />
            <FormHelperText>
              {password !== null && password.length === 0
                ? "Поле не должно быть пустым"
                : ""}
            </FormHelperText>
            <FormHelperText sx={{ color: theme.palette.error.main }}>
              {error || ""}
            </FormHelperText>
          </FormControl>
          <LoadingButton
            disabled={
              login === null ||
              login.length === 0 ||
              password === null ||
              password.length < 8
            }
            variant="contained"
            onClick={handleLoginClick}
            loading={isLoading}
          >
            Войти
          </LoadingButton>
          <Button
            size="small"
            onClick={() => {
              setRegisterModalDisplay(true);
              setLoginModalDisplay(false);
            }}
          >
            Регистрация
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

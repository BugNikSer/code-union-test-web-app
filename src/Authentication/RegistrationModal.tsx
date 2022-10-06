import React, { useState } from "react";
import type { FC, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setUser, setTokens } from "./AuthenticationSlice";
import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  Slide,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { register } from "../api";
import type { IRegisterProps } from "../api";
import { TransitionProps } from "@mui/material/transitions";

interface IRegisterModalProps {
  isRegisterModalDisplay: boolean;
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

export const RegisterModal: FC<IRegisterModalProps> = ({
  isRegisterModalDisplay,
  setLoginModalDisplay,
  setRegisterModalDisplay,
}) => {
  // Хранение полей ввода
  const [email, setEmail] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [isPasswordMasked, setPasswordMasked] = useState<boolean>(true);
  const [passwordConfirm, setPasswordConfirm] = useState<string | null>(null);
  const [isPasswordConfirmMasked, setPasswordConfirmMasked] =
    useState<boolean>(true);
  const [isAgree, setAgree] = useState<boolean>(false);

  // Состояния запроса
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Утилиты
  const dispatch = useDispatch();
  const theme = useTheme();

  // Обработчик
  const handleRegisterClick = (): void => {
    const data: IRegisterProps = {
      email: email || "",
      nickname: nickname || "",
      phone: phone || "",
      password: password || "",
    };

    setLoading(true);
    register(data)
      .then((res) => {
        if (Object.keys(res).includes("tokens")) {
          dispatch(setTokens(res.tokens));
          dispatch(setUser(res.user));
          setRegisterModalDisplay(false);
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

  // Валидный ли email
  const isEmailMatch = email && email.match(/^[\w-.]+@([\w-.]+\.)+[\w-]{2,4}$/);

  return (
    <Dialog
      open={isRegisterModalDisplay}
      onClose={() => setRegisterModalDisplay(false)}
      TransitionComponent={Transition}
    >
      <DialogTitle
        textAlign="center"
        variant="h5"
        fontWeight="bold"
        letterSpacing={1}
      >
        Регистрация
      </DialogTitle>
      <DialogContent>
        <Stack sx={{ pt: "20px!important" }} spacing={1}>
          {/* email */}
          <FormControl
            error={(email !== null && email.length === 0) || !isEmailMatch}
          >
            <TextField
              color={
                email === null ? "info" : isEmailMatch ? "success" : "error"
              }
              required
              value={email || ""}
              label="Электронная почта"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
                setError(null);
              }}
            />
            <FormHelperText>
              {email !== null && email.length === 0
                ? "Поле не должно быть пустым"
                : ""}
            </FormHelperText>
          </FormControl>
          {/* nickname */}
          <FormControl error={nickname !== null && nickname.length === 0}>
            <TextField
              color="info"
              required
              value={nickname || ""}
              label="Имя пользователя"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setNickname(event.target.value);
                setError(null);
              }}
            />
            <FormHelperText>
              {nickname !== null && nickname.length === 0
                ? "Поле не должно быть пустым"
                : ""}
            </FormHelperText>
          </FormControl>
          {/* phone */}
          <FormControl error={phone !== null && phone.length < 11}>
            <TextField
              /* eslint-disable indent*/
              color={
                phone === null
                  ? "info"
                  : phone.length < 11
                  ? "error"
                  : "success"
              }
              /* eslint-enable indent*/
              required
              value={phone || ""}
              label="Телефон"
              placeholder="11+ цифр"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const { value } = event.target;
                if (value.match(/^\d*$/)) {
                  setPhone(value);
                  setError(null);
                }
              }}
            />
            <FormHelperText>
              {phone !== null && phone.length === 0
                ? "Поле не должно быть пустым"
                : ""}
            </FormHelperText>
          </FormControl>
          {/* password */}
          <FormControl error={password !== null && password.length === 0}>
            <TextField
              /* eslint-disable indent*/
              color={
                password === null
                  ? "info"
                  : password.length < 8
                  ? "error"
                  : "success"
              }
              /* eslint-enable indent*/
              required
              value={password || ""}
              label="Пароль"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const { value } = event.target;
                setPassword(value);
                setError(null);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                    {isPasswordMasked ? (
                      <VisibilityOffOutlined
                        onClick={() => setPasswordMasked(false)}
                      />
                    ) : (
                      <VisibilityOutlined
                        onClick={() => setPasswordMasked(true)}
                      />
                    )}
                  </InputAdornment>
                ),
                type: isPasswordMasked ? "password" : "text",
              }}
            />
            <FormHelperText>
              {password !== null && password.length === 0
                ? "Поле не должно быть пустым"
                : ""}
            </FormHelperText>
          </FormControl>
          {/* password confirm */}
          <FormControl
            error={passwordConfirm !== null && passwordConfirm.length === 0}
          >
            <TextField
              /* eslint-disable indent*/
              color={
                passwordConfirm === null
                  ? "info"
                  : password !== passwordConfirm
                  ? "error"
                  : "success"
              }
              /* eslint-enable indent*/
              error={
                password !== null &&
                passwordConfirm !== null &&
                password !== passwordConfirm
              }
              required
              value={passwordConfirm || ""}
              label="Пароль"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const { value } = event.target;
                setPasswordConfirm(value);
                setError(null);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                    {isPasswordConfirmMasked ? (
                      <VisibilityOffOutlined
                        onClick={() => setPasswordConfirmMasked(false)}
                      />
                    ) : (
                      <VisibilityOutlined
                        onClick={() => setPasswordConfirmMasked(true)}
                      />
                    )}
                  </InputAdornment>
                ),
                type: isPasswordConfirmMasked ? "password" : "text",
              }}
            />
            <FormHelperText>
              {passwordConfirm !== null && passwordConfirm.length === 0
                ? "Поле не должно быть пустым"
                : ""}
            </FormHelperText>
            <FormHelperText sx={{ color: theme.palette.error.main }}>
              {error || ""}
            </FormHelperText>
          </FormControl>
          {/* agree */}
          <FormControlLabel
            label="Я принимаю условия Пользовательского соглашения, политики конфиденциальности, Обработки и распространения персональных данных"
            control={
              <Checkbox
                color="secondary"
                checked={isAgree}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setAgree(event.target.checked);
                }}
              />
            }
          />
          {/* register */}
          <LoadingButton
            disabled={
              email === null ||
              !isEmailMatch ||
              nickname === null ||
              nickname.length === 0 ||
              phone === null ||
              phone.length < 11 ||
              password === null ||
              password.length < 8 ||
              passwordConfirm === null ||
              passwordConfirm !== password ||
              !isAgree
            }
            variant="contained"
            onClick={handleRegisterClick}
            loading={isLoading}
          >
            Зарегистрироваться
          </LoadingButton>
          {/* go to login */}
          <Button
            size="small"
            onClick={() => {
              setLoginModalDisplay(true);
              setRegisterModalDisplay(false);
            }}
          >
            У меня есть аккаунт
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

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
import { auth } from "../api";
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
  const [passwordConfirm, setPasswordConfirm] = useState<string | null>(null);
  // Состояния запроса
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Утилиты
  const theme = useTheme();
  const dispatch = useDispatch();

  // Валидный ли email
  const isEmailMatch = email && email.match(/^[\w-.]+@([\w-.]+\.)+[\w-]{2,4}$/);

  return (
    <Dialog
      open={isRegisterModalDisplay}
      onClose={() => setLoginModalDisplay(false)}
      TransitionComponent={Transition}
    >
      <DialogTitle>Регистрация</DialogTitle>
      <DialogContent>
        <Stack sx={{ pt: "20px!important" }} spacing={1}>
          {/* email */}
          <FormControl
            error={(email !== null && email.length === 0) || !isEmailMatch}
          >
            <TextField
              color="info"
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
          <FormControl error={phone !== null && phone.length === 0}>
            <TextField
              color="info"
              required
              value={phone || ""}
              label="Телефон (11+ цифр)"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                // event.preventDefault();
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
              color="info"
              required
              value={password || ""}
              label="Пароль"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const { value } = event.target;
                if (value.match(/^\d*$/)) {
                  setPassword(value);
                  setError(null);
                }
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
              color="info"
              required
              value={passwordConfirm || ""}
              label="Пароль"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const { value } = event.target;
                if (value.match(/^\d*$/)) {
                  setPasswordConfirm(value);
                  setError(null);
                }
              }}
            />
            <FormHelperText>
              {passwordConfirm !== null && passwordConfirm.length === 0
                ? "Поле не должно быть пустым"
                : ""}
            </FormHelperText>
          </FormControl>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

import moment from "moment";
import { useState, useEffect } from "react";

export const setRefreshToCookies = (newToken: string): void => {
  const expireDate = moment()
    .utc()
    .add(1, "days")
    .toString()
    .replace("GMT+0000", "UTC");

  document.cookie = newToken + "; " + expireDate;
};

export const useDebounce = (value: string, delay: number) => {
  // Состояние и сеттер для отложенного значения
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

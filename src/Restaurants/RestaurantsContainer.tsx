import React, { useEffect } from "react";
import type { FC, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Alert,
  Backdrop,
  CircularProgress,
  Pagination,
  Stack,
} from "@mui/material";
import type { IStore } from "../redux/types";
import { RestaurantCard } from "./RestaurantCard";
import { setPage } from "../AppHeader/searchSlice";
import {
  setIsLoading,
  setRestaurants,
  setError,
} from "../AppHeader/searchSlice";
import { getAllRestaurants } from "../api";
import { useDebounce } from "../tools";

export const RestaurantsContainer: FC = () => {
  const {
    keyword,
    restaurants,
    isLoading,
    error,
    restaurantsCount,
    page,
    perPage,
  } = useSelector((state: IStore) => state.search);
  const { accessToken } = useSelector(
    (state: IStore) => state.authentication.tokens
  );

  const dispatch = useDispatch();

  const handleChange = (_: ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };

  const debouncedSearchTerms = useDebounce(
    JSON.stringify({ accessToken, page, perPage, keyword }),
    300
  );

  // запрос ресторанов
  function fetchRestaurants() {
    dispatch(setIsLoading());
    getAllRestaurants({
      req: { keyword, page, perPage },
      token: accessToken || "",
    }).then((res) => {
      if (res.restaurants) {
        dispatch(setRestaurants(res));
      } else {
        dispatch(setError(res.message));
      }
    });
  }

  // запрос ресторанов при изменении условий поиска
  useEffect(() => {
    if (accessToken && debouncedSearchTerms) {
      fetchRestaurants();
    }
  }, [debouncedSearchTerms]);

  // определение контента
  let content: string | JSX.Element = "";
  if (!accessToken) {
    // пользователь не авторизован
    content = (
      <Alert sx={{ m: 2 }} severity="warning">
        Войдите или зарегистрируйтесь
      </Alert>
    );
  } else if (error) {
    // запрос вернул ошибку
    content = <Alert severity="error">{error.toString()}</Alert>;
  } else if (restaurants && restaurants.length === 0) {
    // список ресторанов пуст
    content = (
      <Alert sx={{ m: 2 }} severity="info">
        Рестораны не найдены
      </Alert>
    );
  } else if (restaurants && restaurants.length > 0) {
    // есть список ресторанов
    content = (
      <Stack direction="column">
        <Stack
          direction="row"
          spacing={2}
          sx={{ p: 2, pr: 4, pl: 4, rowGap: 2, flexWrap: "wrap", flex: 1 }}
          justifyContent="center"
        >
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={`restaurant-card-${restaurant.id}`}
              restaurant={restaurant}
            />
          ))}
        </Stack>
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
          color="primary"
          count={Math.ceil(restaurantsCount / perPage)}
          onChange={handleChange}
          page={page}
          showFirstButton
          showLastButton
        />
      </Stack>
    );
  }

  return (
    <>
      {content}
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};

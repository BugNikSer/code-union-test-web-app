import React from "react";
import type { FC } from "react";
import { useSelector } from "react-redux";
import { Alert, Backdrop, CircularProgress, Stack } from "@mui/material";
import type { IStore } from "../redux/types";
import { RestaurantCard } from "./RestaurantCard";

export const RestaurantsContainer: FC = () => {
  const { result, isLoading, error } = useSelector(
    (state: IStore) => state.search
  );

  console.log(error);

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ p: 2, pr: 4, pl: 4, rowGap: 2 }}
      justifyContent="center"
    >
      {result ? (
        <>
          {result.map((restaurant) => (
            <RestaurantCard
              key={`restaurant-card-${restaurant.id}`}
              restaurant={restaurant}
            />
          ))}
        </>
      ) : error ? (
        <Alert severity="error">{error.toString()}</Alert>
      ) : (
        ""
      )}
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </Stack>
  );
};

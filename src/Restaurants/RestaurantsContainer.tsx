import React from "react";
import type { FC } from "react";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import type { IStore } from "../redux/types";
import { RestaurantCard } from "./RestaurantCard";

export const RestaurantsContainer: FC = () => {
  const { result, isLoading, error } = useSelector(
    (state: IStore) => state.search
  );

  return (
    <Stack>
      {result ? (
        <Stack>
          {result.map((restaurant) => (
            <RestaurantCard
              key={`restaurant-card-${restaurant.id}`}
              restaurant={restaurant}
            />
          ))}
        </Stack>
      ) : (
        ""
      )}
    </Stack>
  );
};

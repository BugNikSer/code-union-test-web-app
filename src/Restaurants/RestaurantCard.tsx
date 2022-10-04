import React from "react";
import type { FC } from "react";
import type { IRestaurant } from "./types";

export const RestaurantCard: FC<{ restaurant: IRestaurant }> = ({
  restaurant,
}) => {
  return <div>{JSON.stringify(restaurant)}</div>;
};

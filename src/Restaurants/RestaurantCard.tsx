import React from "react";
import type { FC } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  LocationOn,
  Storefront,
} from "@mui/icons-material";
import type { IRestaurant } from "./types";

export const RestaurantCard: FC<{ restaurant: IRestaurant }> = ({
  restaurant,
}) => {
  const { title, description, coords, images, is_favourite } = restaurant;
  const restaurantImage = images.length > 0 ? images[0].url : undefined;
  return (
    <Card
      elevation={3}
      sx={{ display: "flex", flexDirection: "column", maxWidth: 250 }}
    >
      {restaurantImage ? (
        <CardMedia component="img" image={restaurantImage} />
      ) : (
        <Stack
          direction="row"
          sx={{
            pt: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Storefront fontSize="large" color="secondary" />
        </Stack>
      )}
      <CardContent sx={{ flex: 1 }}>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
          <Stack direction="row" spacing={1}>
            <LocationOn color="secondary" />
            <Typography variant="subtitle2">{coords.address_name}</Typography>
          </Stack>
          <Typography variant="subtitle2">{description}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <IconButton color="error">
          {is_favourite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

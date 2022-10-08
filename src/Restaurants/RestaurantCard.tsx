import React, { useState } from "react";
import type { FC } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import {
  Close,
  Favorite,
  FavoriteBorder,
  LocationOn,
  Storefront,
} from "@mui/icons-material";
import type { IRestaurant } from "./types";
import { likeRestaurant, dislikeRestaurant } from "../api";
import { IStore } from "../redux/types";

export const RestaurantCard: FC<{ restaurant: IRestaurant }> = ({
  restaurant,
}) => {
  // деструктуризация
  const { id, title, description, coords, images, is_favourite } = restaurant;

  // локальные состояния
  const [isFavouriteHot, setFavouriteHot] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  // редакс
  const { tokens } = useSelector((state: IStore) => state.authentication);

  // локальные переменные
  const isFavourite: boolean =
    isFavouriteHot === null ? is_favourite : isFavouriteHot;
  const restaurantImage = images.length > 0 ? images[0].url : undefined;

  // обработчики
  const handleLikeClick = () => {
    if (isFavourite) {
      dislikeRestaurant(id, tokens.accessToken || "")
        .then((res) => {
          if (res.success) {
            setFavouriteHot(false);
          } else {
            setError(res.message);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      likeRestaurant(id, tokens.accessToken || "")
        .then((res) => {
          if (res.like) {
            setFavouriteHot(true);
          } else {
            setError(res.message);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };
  const closeError = () => {
    setError(null);
  };

  return (
    <Card
      elevation={5}
      sx={{ display: "flex", flexDirection: "column", maxWidth: 250 }}
    >
      {/* картинка ресторана */}
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
      {/* описание ресторана */}
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
      {/* кнопки */}
      <CardActions>
        <IconButton color="error" onClick={handleLikeClick}>
          {isFavourite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
      {/* уведомление об ошибке */}
      <Snackbar
        open={Boolean(error)}
        onClose={closeError}
        message={error || ""}
        action={
          <IconButton onClick={closeError} color="error">
            <Close />
          </IconButton>
        }
        autoHideDuration={3000}
      />
    </Card>
  );
};

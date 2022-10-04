export interface IRestaurant {
  is_favourite: boolean;
  id: number;
  title: string;
  description: string;
  schedule_id: number;
  coords_id: number;
  user_id: number;
  schedule: {
    id: number;
    opening: string;
    closing: string;
  };
  coords: {
    id: number;
    longitude: number;
    latitude: number;
    address_name: string;
  };
  images: [
    {
      id: number;
      url: string;
      restaurant_id: number;
    }
  ];
  user: {
    id: number;
    email: string;
    nickname: string;
  };
}

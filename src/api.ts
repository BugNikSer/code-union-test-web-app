const baseUrl = "http://localhost:3000/api/v1";
// const baseUrl = "/api/v1";

export interface ILoginProps {
  nickname?: string;
  email?: string;
  password: string;
}

export const auth = async (data: ILoginProps) => {
  return fetch(baseUrl + "/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

export interface IRegisterProps {
  email: string;
  nickname: string;
  phone: string;
  password: string;
}

export const register = async (data: IRegisterProps) => {
  return fetch(baseUrl + "/auth/registration/customer/new", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

export const refreshToken = async (refreshToken: string) => {
  return fetch(baseUrl + "/auth/login/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

export const getProfile = async (accessToke: string) => {
  return fetch(baseUrl + "/auth/login/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToke}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

interface IGetAllRestaurantsReqParams {
  page: number;
  perPage: number;
  keyword: string;
}

export interface IGetAllRestaurantsParams {
  req: IGetAllRestaurantsReqParams;
  token?: string;
}

export const getAllRestaurants = async (params: IGetAllRestaurantsParams) => {
  let getParams = "";
  const { req, token } = params;

  // Формирование строки с параметрами GET запроса
  if (req) {
    getParams = Object.keys(req)
      .reduce((result: string[], key: string) => {
        const value: number | string = req[
          key as keyof IGetAllRestaurantsReqParams
        ] as number | string;
        if (key !== "keyword" || (key === "keyword" && value !== ""))
          result.push(`${key}=${value}`);
        return result;
      }, [])
      .join("&");
  }

  const url =
    baseUrl +
    "/restaurants/all" +
    (getParams.length > 0 ? "?" + getParams : "");

  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const likeRestaurant = async (
  restaurant_id: number,
  accessToke: string
) => {
  return fetch(baseUrl + "/likes/new", {
    method: "POST",
    body: JSON.stringify({ restaurant_id }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToke}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

export const dislikeRestaurant = async (
  restaurant_id: number,
  accessToke: string
) => {
  return fetch(baseUrl + "/likes/" + restaurant_id.toString(), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToke}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

const baseUrl = "http://localhost:3000/api/v1";
// const baseUrl = "/api/v1";

// export const getProfile = () => fetch(baseUrl + "login/profile")
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => console.error(e));

export interface ILoginProps {
  nickname?: string;
  email?: string;
  password: string;
}

export const auth = async (data: {
  email?: string;
  nickname?: string;
  password: string;
}) => {
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
  console.log("fetching restaurants");
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
      console.log("fetch res", res);
      return res;
    })
    .catch((error) => {
      console.log("fetch error", error);
      return error;
    });
};

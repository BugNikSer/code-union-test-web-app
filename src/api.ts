const baseUrl = "http://localhost:3000/api/v1";
// const baseUrl = "/api/v1";

// export const getProfile = () => fetch(baseUrl + "login/profile")
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => console.error(e));

export const auth = (data: { email: string; password: string }) => {
  fetch(baseUrl + "/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((e) => console.error(e));
};

export const register = (data: {
  email: string;
  nickname: string;
  phone: string;
  password: string;
}) => {
  fetch(baseUrl + "/auth/registration/customer/new", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
    });
};

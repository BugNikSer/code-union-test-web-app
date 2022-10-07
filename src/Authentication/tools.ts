import moment from "moment";

export const setRefreshToCookies = (refreshToken: string): void => {
  const expireDate = moment()
    .utc()
    .add(1, "days")
    .toString()
    .replace("GMT+0000", "UTC");

  document.cookie = refreshToken + "; " + expireDate;
};

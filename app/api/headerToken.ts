import axiosInstance from "./axiosInstance";

export default class HeaderToken {
  public static set = (token: string | null): void => {
    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `${token}`;
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  };

  public static get = () => {
    return axiosInstance.defaults.headers.common.Authorization;
  };
}

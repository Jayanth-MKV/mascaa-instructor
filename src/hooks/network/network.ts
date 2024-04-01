import { BASE_URL } from "@/utils/constants";
import { getSessionCookie } from "@/utils/helpers";
import axios from "axios";

const client = axios.create({
  baseURL: BASE_URL,
});

export const request = async (options: any) => {
  let token = "";

  const cookie = await getSessionCookie();
  if (cookie) {
    const { value } = cookie;
    token = value;
  }

  console.log(cookie);
  // Set the authorization header
  token !== "" &&
    (client.defaults.headers.common.Authorization = `Bearer ${token}`);

  const onSuccess = async (response: any) => {
    console.log(response?.data);
    return response?.data;
  };

  const onError = async (error: any) => {
    return Promise.reject(error?.response?.data);
  };

  return client(options).then(onSuccess).catch(onError);
};

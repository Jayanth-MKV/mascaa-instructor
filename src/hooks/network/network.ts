import { BASE_URL, FRONTEND_URL } from "@/utils/constants";
import { getSessionCookie } from "@/utils/helpers";
import axios from "axios";
import { redirect } from "next/navigation";

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

  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        redirect(`${FRONTEND_URL}/auth/signout`)
      }
      return Promise.reject(error);
    },
  );

  // console.log(cookie);
  // Set the authorization header
  token !== "" &&
    (client.defaults.headers.common.Authorization = `Bearer ${token}`);

  const onSuccess = async (response: any) => {
    // console.log(response?.data);
    return response?.data;
  };

  const onError = async (error: any) => {
    // console.log(error);
    return Promise.reject(error?.response?.data);
  };

  return client(options).then(onSuccess).catch(onError);
};

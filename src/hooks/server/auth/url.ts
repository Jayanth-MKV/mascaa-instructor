import { request } from "@/hooks/network/network";

const BASE_URL = "auth";

export const loginInstructor = async (data: any) => {
  console.log(data);
  const res = await request({
    method: "POST",
    url: `${BASE_URL}/ilogin`,
    data,
  });
  console.log(res);
  return res;
};

export const logoutInstructor = async (data: any) => {
  return await request({
    method: "POST",
    url: `${BASE_URL}/ilogin`,
    data,
  });
};

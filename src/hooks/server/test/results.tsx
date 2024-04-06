import { request } from "@/hooks/network/network";

const BASE_URL = "submission";


export const getTestSubmissions = async (id: string) => {
  // console.log("id",id)
  return await request({
    method: "GET",
    url: `${BASE_URL}/all/${id}`,
  });
};
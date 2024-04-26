import { request } from "@/hooks/network/network";

const BASE_URL = "submission";


export const getTestSubmissions = async (id: string) => {
  const resp =  await request({
    method: "GET",
    url: `${BASE_URL}/all/${id}`,
  });
  return resp;
};

export const getTestEvaluation = async (id: string) => {
  const resp =  await request({
    method: "GET",
    url: `evaluation/test/user/${id}`,
  });
  return resp;
};

export const getSubResults = async (id: string) => {
  // console.log("id",id)
  return await request({
    method: "GET",
    url: `evaluation/submission/${id}/results`,
  });
};

export const ReEvalTest = async ({id}:{id: string}) => {
  // console.log("id",id)
  return await request({
    method: "GET",
    url: `evaluation/submission/${id}/test/reload`,
  });
};

export const ReEvalAlgo = async ({id}:{id: string}) => {
  // console.log("id",id)
  return await request({
    method: "GET",
    url: `evaluation/submission/${id}/results/reload`,
  });
};

export const getUser = async ({id}:{id: string}) => {
  return await request({
    method: "GET",
    url: `user/${id}`,
  });
};
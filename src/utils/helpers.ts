"use server";
import { cookies } from "next/headers";

export const getSessionCookie = async ()=>{
    return cookies().get("token")
}
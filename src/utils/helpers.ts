"use server";
import { cookies } from "next/headers";

export const getSessionCookie = async ()=>{
    return cookies().get("token")
}


export const getDataFromJson=async (text:string)=>{
    return text.slice(7,text.length-3)
}
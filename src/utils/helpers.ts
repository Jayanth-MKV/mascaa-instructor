"use server";
import { cookies } from "next/headers";

export const getSessionCookie = async ()=>{
    return cookies().get("token")
}


export const getDataFromJson=async (text:string)=>{
    return text.slice(7,text.length-3)
}

export const getConfLevel = async (cf:number)=>{
    return (cf<=60) ? "LOW" : (cf>=60 && cf<=80 )? "MEDIUM" : "HIGH";
}
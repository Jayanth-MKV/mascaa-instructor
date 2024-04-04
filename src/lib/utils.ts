import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function convertDateToIst(date:string,options?:any){
  const formattedDate = new Date(date).toLocaleString(options
  //   "en-IN", {
  //   timeZone: "Asia/Kolkata",
  //   dateStyle: "long",
  //   timeStyle: "short",
  // }
  );

  return formattedDate;
}
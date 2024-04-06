import { request } from "@/hooks/network/network";
import { inviteMail, Test } from "@/types/types";

const BASE_URL="instructor";

export const sendEmails = async ({data}:{data: inviteMail} ) => {
  console.log(data);
  // return {jobId:"123"};
    return await request({
      method: "POST",
      url: `${BASE_URL}/sendinviteemails`,
      data,
    });
  };

  export const sendEmail = async ({data}:{data: inviteMail}) => {
    return await request({
      method: "POST",
      url: `${BASE_URL}/sendinviteemail`,
      data,
    });
  };
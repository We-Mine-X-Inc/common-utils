import axios from "axios";

export async function sendNotification(params: { url: string; text: string }) {
  await axios(params.url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: { text: params.text },
  });
}

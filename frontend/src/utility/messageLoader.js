import { redirect } from "react-router";
import { Fetching } from "../fetching";
export async function messageLoader({ request, params }) {
  const { username, partner } = params;
  const checker = localStorage.getItem("username");
  if (username !== checker) {
    return redirect(`/${checker}`);
  }

  const response = await Fetching("get-messages", {
    sender: username,
    receiver: partner,
  });
  if (response.success) {
    return response.info.messages;
  } else {
    return [];
  }
}

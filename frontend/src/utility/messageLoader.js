import { Fetching } from "../fetching";
export async function loader({ params }) {
  const { username, partner } = params;
  try {
    const response = await Fetching("get-messages", {
      sender: username,
      receiver: partner,
    });
    console.log("Loader response:", response); // Ensure this logs the expected data
    return { initialMessages: response.info.messages };
  } catch (err) {
    console.error("Failed to load messages:", err);
    return { initialMessages: [] };
  }
}

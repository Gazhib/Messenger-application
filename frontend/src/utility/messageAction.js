import { Fetching } from "../fetching";
import { socket } from "../socket";
export async function messageSender({ request, params }) {
  const data = await request.formData();
  const { username, partner } = params;
  const sentMessage = data.get("message");
  let timestamp = new Date().toISOString();
  timestamp = timestamp.slice(11, 16);
  const message = {
    sender: username,
    receiver: partner,
    message: sentMessage,
    timestamp,
  };
  await Fetching("send-message", message);
  socket.emit("sendingMessage", message);
  return message;
}

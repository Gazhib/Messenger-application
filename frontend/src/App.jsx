import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserPage from "./Pages/UserPage";
import AppLayout from "./AppLayout";
import ErrorPage from "./Pages/ErrorPage";
import Auth from "./Pages/AuthPage";
import ChatPage from "./Pages/ChatPage";
import Chat from "./Components/Chat";
import { messageLoader } from "./utility/messageLoader";
import { messageSender } from "./utility/messageAction";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: ":username",
          id: "messages",
          element: <ChatPage />,
          children: [
            {
              action: messageSender,
              loader: messageLoader,
              element: <Chat />,
              path: "chat/:partner",
            },
          ],
        },
        { path: "auth", element: <Auth /> },
        { path: "user/:username", element: <UserPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

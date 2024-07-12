import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";
import UserPage from "./Pages/UserPage";
import AppLayout from "./AppLayout";
import ErrorPage from "./Pages/ErrorPage";
import Auth from "./Pages/AuthPage";
import Chat from "./Components/Chat";
import { loader as messageLoader } from "./utility/messageLoader";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: ":username",
          element: <ChatPage />,
          children: [
            { path: ":partner", loader: messageLoader, element: <Chat /> },
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

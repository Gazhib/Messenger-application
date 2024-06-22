import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from "./Components/ChatPage";
import RegistrationPage from "./Components/RegistrationPage";
import UserPage from "./Components/UserPage";
import AppLayout from "./AppLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "", element: <ChatPage /> },
        { path: "registration", element: <RegistrationPage /> },
        { path: "user/:username", element: <UserPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

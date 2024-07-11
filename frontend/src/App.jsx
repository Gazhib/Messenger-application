import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from "./Components/ChatPage";
import UserPage from "./Components/UserPage";
import AppLayout from "./AppLayout";
import RegistrationPage from "./Components/RegistrationPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <ChatPage /> },
        { path: "auth", element: <RegistrationPage /> },
        { path: "user/:username", element: <UserPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

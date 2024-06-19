import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout";
import RegistrationPage from "./Components/RegistrationPage";
import SignInPage from "./Components/SignInPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "registration", element: <RegistrationPage /> },
      { path: "login", element: <SignInPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

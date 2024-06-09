import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import NotFound from "src/views/Error";
import Root from "src/layouts/Root";
import Feed from "src/views/Feed";
import Profile from "src/views/Profile";
import Login from "./views/Login";
import Protected from "./components/Protected";
import Landing from "./views/Landing";
import Visitor from "./layouts/Visitor";
import PrivacyPolicy from "./views/legal-pages/PrivacyPolicy";
import CookiePolicy from "./views/legal-pages/CookiePolicy";
import Disclaimer from "./views/legal-pages/Disclaimer";
import TermsOfService from "./views/legal-pages/TermsOfService";

export const AppRouter = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  let routes = [];

  if (user) {
    routes = [
      {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
          { index: true, element: <Protected component={Feed} /> },
          { path: "account", element: <Protected component={Profile} /> },
          { path: "login", element: <Login /> },
        ],
      },
    ];
  } else {
    routes = [
      {
        path: "/",
        element: <Visitor />,
        errorElement: <NotFound />,
        children: [
          { index: true, element: <Landing /> },
          { path: "login", element: <Login /> },
          { path: "privacy-policy", element: <PrivacyPolicy /> },
          { path: "cookie-policy", element: <CookiePolicy /> },
          { path: "disclaimer", element: <Disclaimer /> },
          { path: "terms-of-service", element: <TermsOfService /> },
        ],
      },
    ];
  }

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

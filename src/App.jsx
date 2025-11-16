import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ScrollToTop from "./Components/ScrollToTop";
import NotFound from "./Components/NotFound";
import ComingSoon from "./Components/ComingSoon";
// import FAQ from './pages/FAQ';

const App = () => {
  const router = createBrowserRouter([
    {
      element: <ScrollToTop />,
      children: [
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "/",
          element: <ComingSoon />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

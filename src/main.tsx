import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import NotFoundPage from './pages/NotFound.tsx';
import HomePage from './pages/Home.tsx';
import Contact from './pages/Contact.tsx';
import Faq from './pages/Faq.tsx';
import About from './pages/About.tsx';
import Pricing from './pages/Pricing.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';
import Resources from './pages/Resources.tsx';
import TermsOfUse from './pages/TermsOfUse.tsx';
import Login from './pages/auth/Login.tsx';
import Signup from './pages/auth/Signup.tsx';


const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <WelcomePage />,
  // },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/faq",
    element: <Faq />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/resources",
    element: <Resources />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms-of-use",
    element: <TermsOfUse />,
  },
  {
    path: "/auth",
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ]
  },
  
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)

import { createBrowserRouter } from "react-router-dom";

import NotFoundPage from './pages/NotFound.tsx';
import HomePage from './pages/Home.tsx';
import Contact from './pages/Contact.tsx';
import Faq from './pages/Faq.tsx';
import About from './pages/About.tsx';
import Pricing from './pages/Pricing.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';
import TermsOfUse from './pages/TermsOfUse.tsx';
import Login from './pages/auth/Login.tsx';
import Signup from './pages/auth/Signup.tsx';

import ScrollToTop from "./components/ScrollToTop.tsx";
import Signup2 from "./pages/auth/Signup2.tsx";
import ArtistDetails from "./pages/auth/ArtistDetails.tsx";
import RecordLabelDetails from "./pages/auth/RecordLabelDetails.tsx";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <ScrollToTop><HomePage /></ScrollToTop>,
  
    },
    {
      path: "/contact",
      element: <ScrollToTop><Contact /></ScrollToTop>,
    },
    {
      path: "/faq",
      element: <ScrollToTop><Faq /></ScrollToTop>,
    },
    {
      path: "/about",
      element: <ScrollToTop><About /></ScrollToTop>,
    },
    {
      path: "/pricing",
      element: <ScrollToTop><Pricing /></ScrollToTop>,
    },
    {
      path: "/privacy-policy",
      element: <ScrollToTop><PrivacyPolicy /></ScrollToTop>,
    },
    {
      path: "/terms-of-use",
      element: <ScrollToTop><TermsOfUse /></ScrollToTop>,
    },
    {
      path: "/auth",
      children: [
        {
          path: "",
          element: <ScrollToTop><Login /></ScrollToTop>,
        },
        {
          path: "login",
          element: <ScrollToTop><Login /></ScrollToTop>,
        },
        {
          path: "signup",
          element: <ScrollToTop><Signup /></ScrollToTop>,
        },
        {
          path: "signup-type",
          element: <ScrollToTop><Signup2 /></ScrollToTop>,
        },
        {
          path: "signup-artistDetails",
          element: <ScrollToTop><ArtistDetails /></ScrollToTop>,
        },
        {
          path: "signup-recordLabelDetails",
          element: <ScrollToTop><RecordLabelDetails /></ScrollToTop>,
        },
      ]
    },
    
    {
      path: "*",
      element: <ScrollToTop><NotFoundPage /></ScrollToTop>
    }
]);

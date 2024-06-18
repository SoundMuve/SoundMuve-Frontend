import { createBrowserRouter } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop.tsx";
import NotFoundPage from './pages/NotFound.tsx';
import HomePage from './pages/Home.tsx';
import Contact from './pages/Contact.tsx';
import Faq from './pages/Faq.tsx';
import About from './pages/About.tsx';
import Pricing from './pages/Pricing.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';
import TermsOfUse from './pages/TermsOfUse.tsx';

import AuthLayout from "./pages/auth/AuthLayout.tsx";
import Login from './pages/auth/Login.tsx';
import Signup from './pages/auth/Signup.tsx';
import SignupType from "./pages/auth/SignupType.tsx";
import ArtistDetails from "./pages/auth/ArtistDetails.tsx";
import RecordLabelDetails from "./pages/auth/RecordLabelDetails.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword.tsx";
import VerifyEmail from "./pages/auth/VerifyEmail.tsx";
import CreateNewPassword from "./pages/auth/CreateNewPassword.tsx";

import AccountLayout from "./pages/account/AccountLayout.tsx";
import DashboardHome from "./pages/account/DashboardHome.tsx";

import DashboardArtist from "./pages/account/artist/DashboardArtist.tsx";
import CreateSingle from "./pages/account/artist/CreateSingleRelease.tsx";
import DashboardRecordLabel from "./pages/account/DashboardRecordLabel.tsx";
import CreateSingleRelease2 from "./pages/account/artist/CreateSingleRelease2.tsx";
import BalanceHistory from "./pages/account/artist/BalanceHistory.tsx";
import SalesReport from "./pages/account/artist/SalesReport.tsx";
import AnalyticsReach from "./pages/account/artist/AnalyticsReach.tsx";
import SongDetails from "./pages/account/artist/SongDetails.tsx";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <ScrollToTop />,
      children: [
        {
          path: "",
          element: <HomePage />
        },
        {
          path: "contact",
          element: <Contact />
        },
        {
          path: "faq",
          element: <Faq />
        },
        {
          path: "about",
          element: <About />
        },
        {
          path: "pricing",
          element: <Pricing />
        },
        {
          path: "privacy-policy",
          element: <PrivacyPolicy />
        },
        {
          path: "terms-of-use",
          element: <TermsOfUse />
        },
        {
          path: "about",
          element: <About />
        },

        {
          path: "auth",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />
            },
            {
              path: "login",
              element: <Login />
            },
            {
              path: "forgot-password",
              element: <ForgotPassword />
            },
            {
              path: "verify-email",
              element: <VerifyEmail />
            },
            {
              path: "create-new-password",
              element: <CreateNewPassword />
            },
            {
              path: "signup",
              element: <Signup />
            },
            {
              path: "signup-type",
              element: <SignupType />
            },
            {
              path: "signup-artistDetails",
              element: <ArtistDetails />
            },
            {
              path: "signup-recordLabelDetails",
              element: <RecordLabelDetails />
            },
          ]
        },

        {
          path: "account",
          element: <AccountLayout />,
          children: [
            {
              path: "",
              element: <DashboardHome />
            },
            {
              path: "artist",
              // element: <DashboardArtist />,
              children: [
                {
                  path: "",
                  element: <DashboardArtist />,
                },
                {
                  path: "create-single-release",
                  element: <CreateSingle />
                },
                {
                  path: "create-single-release-continue",
                  element: <CreateSingleRelease2 />
                },
                {
                  path: "balance-history",
                  element: <BalanceHistory />
                },
                {
                  path: "sales-report",
                  element: <SalesReport />
                },
                {
                  path: "analytics-reach",
                  element: <AnalyticsReach />
                },
                {
                  path: "song-details",
                  element: <SongDetails />
                },
              ]
            },
            {
              path: "record-label",
              element: <DashboardRecordLabel />
            },
          ]
        },


        {
          path: "*",
          element: <NotFoundPage />
        }
      ]
  
    },

    {
      path: "*",
      element: <NotFoundPage />
    }
]);

// export const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <ScrollToTop><HomePage /></ScrollToTop>,
  
//     },
//     {
//       path: "/contact",
//       element: <ScrollToTop><Contact /></ScrollToTop>,
//     },
//     {
//       path: "/faq",
//       element: <ScrollToTop><Faq /></ScrollToTop>,
//     },
//     {
//       path: "/about",
//       element: <ScrollToTop><About /></ScrollToTop>,
//     },
//     {
//       path: "/pricing",
//       element: <ScrollToTop><Pricing /></ScrollToTop>,
//     },
//     {
//       path: "/privacy-policy",
//       element: <ScrollToTop><PrivacyPolicy /></ScrollToTop>,
//     },
//     {
//       path: "/terms-of-use",
//       element: <ScrollToTop><TermsOfUse /></ScrollToTop>,
//     },
//     {
//       path: "/auth",
//       children: [
//         {
//           path: "",
//           element: <ScrollToTop><Login /></ScrollToTop>,
//         },
//         {
//           path: "login",
//           element: <ScrollToTop><Login /></ScrollToTop>,
//         },
//         {
//           path: "forgot-password",
//           element: <ScrollToTop><ForgotPassword /></ScrollToTop>,
//         },
//         {
//           path: "verify-email",
//           element: <ScrollToTop><VerifyEmail /></ScrollToTop>,
//         },
//         {
//           path: "create-new-password",
//           element: <ScrollToTop><CreateNewPassword /></ScrollToTop>,
//         },
//         {
//           path: "signup",
//           element: <ScrollToTop><Signup /></ScrollToTop>,
//         },
//         {
//           path: "signup-type",
//           element: <ScrollToTop><Signup2 /></ScrollToTop>,
//         },
//         {
//           path: "signup-artistDetails",
//           element: <ScrollToTop><ArtistDetails /></ScrollToTop>,
//         },
//         {
//           path: "signup-recordLabelDetails",
//           element: <ScrollToTop><RecordLabelDetails /></ScrollToTop>,
//         },
//       ]
//     },
//     {
//       path: "/account",
//       element: <ScrollToTop><Dashboard /></ScrollToTop>,
//     },
    
//     {
//       path: "*",
//       element: <ScrollToTop><NotFoundPage /></ScrollToTop>
//     }
// ]);


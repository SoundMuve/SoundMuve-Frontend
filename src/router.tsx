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
import AllMusic from "./pages/account/artist/AllMusic.tsx";
import AlbumDetails from "./pages/account/artist/AlbumDetails.tsx";
import CreateAlbumReleaseDetails from "./pages/account/createAlbumRelease/AlbumDetails.tsx";
import CreateAlbumReleaseAdvanceFeatures from "./pages/account/createAlbumRelease/AdvanceFeatures.tsx";
import CreateAlbumReleaseSelectStores from "./pages/account/createAlbumRelease/SelectStores.tsx";
import CreateAlbumReleaseSongUpload from "./pages/account/createAlbumRelease/SongUpload.tsx";
import CreateAlbumReleaseAlbumArt from "./pages/account/createAlbumRelease/AlbumArt.tsx";
import CreateAlbumReleaseOverview from "./pages/account/createAlbumRelease/Overview.tsx";


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
                  path: "create-album-release-details",
                  element: <CreateAlbumReleaseDetails />
                },
                {
                  path: "create-album-release-advance-features",
                  element: <CreateAlbumReleaseAdvanceFeatures />
                },
                {
                  path: "create-album-release-select-stores",
                  element: <CreateAlbumReleaseSelectStores />
                },
                {
                  path: "create-album-release-song-upload",
                  element: <CreateAlbumReleaseSongUpload />
                },
                {
                  path: "create-album-release-album-art",
                  element: <CreateAlbumReleaseAlbumArt />
                },
                {
                  path: "create-album-release-overview",
                  element: <CreateAlbumReleaseOverview />
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
                {
                  path: "album-details",
                  element: <AlbumDetails />
                },
                {
                  path: "all-music",
                  element: <AllMusic />
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
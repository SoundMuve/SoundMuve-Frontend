import { create } from "zustand";
import { signupInterface, userInterface } from "../constants/modelTypes";
import { removeLocalStorageItem, setLocalStorage } from "@/util/storage";
import { _signupBasicInfoType } from "@/app/auth/signup/index";
import { _signupContactInfoType } from "@/app/auth/signup/ContactInfo";


const userEmptyData: userInterface = {
  _id: "",
  userId: "",
  firstName: "",
  middleName: "",
  lastName: "",
  username: "",
  email: "",
  gender: "",
  dob: "",
  phoneNumber: "",
  password: "",
  referredBy: "",
  country: "",
  // tnc: false,
  location: {
    ip: "",
    lastUsedIps: [],
    country: "",
    region: "",
    city: "",
    isp: "",
    lat: 0,
    lon: 0
  },
  // referralCode: "",
  createdAt: "",
  updatedAt: "",
  pin: 0,
  account: [],
  isEmailVerified: false
};

const _signupData: signupInterface = {
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  email: "",
  username: "",
  dob: "",
  country: "",
  phoneNumber: "",
  password: "",
  referredBy: "",
  tnc: false,
  location: {
    ip: "",
    lastUsedIps: [],
    country: "",
    region: "",
    city: "",
    isp: "",
    lat: 0,
    lon: 0,
  },
  verificationToken: ''
}

type _typeInterface_ = {
  accessToken: string;
  userData: userInterface;
  isLoggedIn: boolean;

  signupData: signupInterface,
  
  _signupMethod: (
    user: _signupBasicInfoType | _signupContactInfoType | 
    {referredBy: string, password: string} | 
    {verificationToken: string, email?: string }
  ) => void;

  // _signupBasicInfo: (user: _signupBasicInfoType) => void;
  // _signupContactInfo: (user: _signupContactInfoType) => void;

  _setUserDetails: (user: userInterface, token: string) => void;
  _loginUser: (user: userInterface, token: string) => void;

  _autoLogin: (user: userInterface) => void;
  _logOutUser: () => void;
  _handleRefresh: (user?: userInterface, token?: string) => void;
  _signUpUser: (user: userInterface) => void;
  _verifyUser: (user: userInterface) => void;
  _updateUser: (user: userInterface) => void;
  // updatePlayerAsync: () => Promise<void>;
};

export const useUserStore = create<_typeInterface_>((set) => ({
  accessToken: "",
  userData: userEmptyData,
  isLoggedIn: false,
  
  signupData: _signupData,
  _signupMethod: (user) => {
    set((state) => {
      return {
        signupData: { ...state.signupData, ...user },
      };
    });
  },

  _loginUser: (user, token) => {
    setLocalStorage("access_token", token);
    setLocalStorage("user", user);

    set((state) => {
      return {
        accessToken: token,
        userData: user,
        isLoggedIn: true,
      };
    });
  },
  _setUserDetails: (user, token) => {
    setLocalStorage("access_token", token);
    setLocalStorage("user", user);

    set((state) => {
      return {
        accessToken: token,
        userData: user,
        // isLoggedIn: true,
      };
    });
  },


  _autoLogin: (user) => {
    setLocalStorage("user", user);

    set((state) => {
      return {
        userData: user,
        isLoggedIn: true,
      };
    });
  },
  _updateUser: (user) => {
    set((state) => {
      const newUserData = { ...state.userData, ...user };
      setLocalStorage("user", newUserData);

      return {
        userData: newUserData,
      };
    });
  },
  _logOutUser: () => {
    removeLocalStorageItem("user");
    removeLocalStorageItem("access_token");

    set((state) => {
      return {
        userData: userEmptyData,
        isLoggedIn: false,
        accessToken: ""
      };
    });
  },

  _handleRefresh: (user, accessToken) => {
    set((state) => {
      if (user && accessToken) {
        return {
          userData: user,
          accessToken: accessToken,
        };
      } else if (user) {
        return {
          userData: user,
        };
      } else if (accessToken) {
        return {
          accessToken: accessToken,
        };
      } else {
        return {
          userData: state.userData,
          accessToken: state.accessToken,
        };
      }
    });
  },

  _signUpUser: (user) => {
    set((state) => {
      return {
        userData: { ...user },
      };
    });
  },
  _verifyUser: () => {},
}));

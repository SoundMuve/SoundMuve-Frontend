import { create } from "zustand";
import { userInterface } from "../constants/typesInterface";
import { removeLocalStorageItem, setLocalStorage } from "../util/storage";


const userEmptyData: userInterface = {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    balance: 0,
    created_at: ""
};



type _typeInterface_ = {
    accessToken: string;
    userData: userInterface;
    isLoggedIn: boolean;
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
    _loginUser: (user, token) => {
        setLocalStorage("access_token", token);
        setLocalStorage("user", user);
    
        set((_state) => {
            return {
                accessToken: token,
                userData: user,
                isLoggedIn: true,
            };
        });
    },
    _autoLogin: (user) => {
        setLocalStorage("user", user);
    
        set((_state) => {
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
    
        set((_state) => {
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
        set((_state) => {
            return {
                userData: { ...user },
            };
        });
    },
    _verifyUser: () => {},
}));
  
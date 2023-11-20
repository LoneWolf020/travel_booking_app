import { useContext, useReducer, createContext } from "react";
import {authReducer} from "../reducer";

const intitialValue = {
  isAuthModalOpen: false,
  isDropDownModalOpen: false,
  username: "",
  number: "",
  email: "",
  password: "",
  confirmPassword: "",
  accessToken: "",
  name: "",
  selectedTab: "login",
};

const AuthContext = createContext(intitialValue);

const AuthProvider = ({children}) => {
    const [{isAuthModalOpen, isDropDownModalOpen, username, number, email,
         password, confirmPassword, accessToken, name, selectedTab}, authDispatch] = useReducer(authReducer, intitialValue);

    return (
        <AuthContext.Provider value={{isAuthModalOpen, isDropDownModalOpen, username, number, email,
            password, confirmPassword, accessToken, name, selectedTab, authDispatch}}>
                {children}
            </AuthContext.Provider>
    )     
}

const useAuth = () => useContext(AuthContext);

export {useAuth, AuthProvider};

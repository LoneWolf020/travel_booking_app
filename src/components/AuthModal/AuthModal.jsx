import "./AuthModal.css";
import { useAuth } from "../../context";
import { AuthLogin, AuthSignup } from "../../components"

export const AuthModal = () => {

    const {authDispatch, selectedTab} = useAuth();

    const handleLoginClick = () => {
        authDispatch({
            type: "SET_TO_LOGIN"
        })
    }

    const handleSignupClick = () => {
        authDispatch({
            type: "SET_TO_SIGNUP"
        })
    }

    const handleCloseClick = () => {
        authDispatch({
            type: "SHOW_AUTH_MODAL"
        })
    }

    return (
        <div className="auth-modal-container">
            <div className="auth-modal shadow">
                <div className="auth-1 shadow">
                    <button className={`button btn-auth cursor-pointer
                         ${selectedTab === "login" ? "btn-auth-selected" : ""}`} onClick={handleLoginClick}>
                        Login
                    </button>
                    <button className={`button btn-auth cursor-pointer
                         ${selectedTab === "signup" ? "btn-auth-selected" : ""}`} onClick={handleSignupClick}>
                        SignUp
                    </button>
                    <button className="button btn-auth btnn-close cursor-pointer" onClick={handleCloseClick}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div>
                    {selectedTab === "login" ? (
                        <AuthLogin />
                    ) : selectedTab === "signup" ? (
                        <AuthSignup />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    )
}
import "./Auth.css";
import { useAlert, useAuth } from "../../context";
import { validateNumber, validatePassword } from "../../utils";
import { loginHandler } from "../../services/login-service";

let isNumberValid, isPasswordValid;

export const AuthLogin = () => {

    const {authDispatch, number, password} = useAuth();
    const {setAlert} = useAlert();

    const handleNumberChange = (evt) => {
        isNumberValid = validateNumber(evt.target.value);
        if(isNumberValid){
            console.log("Valid Number");
            authDispatch({
                type: "NUMBER",
                payload: evt.target.value
            })
        } else {
            console.log("Invalid Number");
        }
    }

    const handlePasswordChange = (evt) => {
        isPasswordValid = validatePassword(evt.target.value);
        if(isPasswordValid){
            console.log("Valid Password");
            authDispatch({
                type: "PASSWORD",
                payload: evt.target.value
            })
        } else {
            console.log("Invalid PAssword");
        }
    }

    const handleFormSubmit = async (evt) => {
        evt.preventDefault();
        if(isNumberValid && isPasswordValid){
            const {accessToken, username} = await loginHandler(number, password, setAlert);
            authDispatch({
                type: "SET_ACCESS_TOKEN",
                payload: accessToken
            })
            authDispatch({
                type: "SET_USER_NAME",
                payload: username
            })
            authDispatch({
                type: "CLEAR_USER_DATA"
            })
            authDispatch({
                type: "SHOW_AUTH_MODAL"
            })
        }
    }

    const handleTestCredentialsClick = async () => {
        const { accessToken, username } = await loginHandler(
          9898989898,
          "Qwerty@1234",
          setAlert
        );
        authDispatch({
          type: "SET_ACCESS_TOKEN",
          payload: accessToken,
        });
        authDispatch({
          type: "SET_USER_NAME",
          payload: username,
        });
        authDispatch({
          type: "CLEAR_USER_DATA",
        });
        authDispatch({
          type: "SHOW_AUTH_MODAL",
        });
      }    

    return (
        <div className="auth-container">
            <form onSubmit={handleFormSubmit}>
                <div className="signup-1 lb-in-container">
                    <label className="auth-label">
                        Mobile Number
                    </label>
                    <input type="number" className="auth-input" maxLength="10" placeholder="Enter Mobile Number"
                        defaultValue={number} onChange={handleNumberChange} required />
                </div>
                <div className="signup-1 lb-in-container">
                    <label className="auth-label">
                        Password
                    </label>
                    <input type="password" className="auth-input" placeholder="Enter Password"
                        defaultValue={password} onChange={handlePasswordChange} required />
                </div>
                <div>
                    <button className="button btn-primary btn-login authenticate">Login</button>
                </div>
            </form>
            <div className="cta">
                <button className="button btn-outline-primary" onClick={handleTestCredentialsClick}>
                    Login with Test Credentials
                </button>
            </div>
        </div>
    )
}
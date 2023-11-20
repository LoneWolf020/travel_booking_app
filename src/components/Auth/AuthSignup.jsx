import "./Auth.css";
import { useAlert, useAuth } from "../../context";
import {validateName, validateNumber, validateEmail, validatePassword} from "../../utils";
import { signupHandler } from "../../services/signup-service";

let isNumberValid, isNameValid, isEmailValid, isPasswordValid, isConfirmPasswordValid;

export const AuthSignup = () => {

    const {username, email, password, number, confirmPassword, authDispatch} = useAuth();
    const {setAlert} = useAlert();

    const handleNumberChange = (evt) => {
        isNumberValid = validateNumber(evt.target.value);
        if(isNumberValid) {
            authDispatch({
                type: "NUMBER",
                payload: evt.target.value
            })
        } else {
            console.log("Invalid Number");
        }
    }

    const handleNameChange = (evt) => {
        isNameValid = validateName(evt.target.value);
        if (isNameValid) {
            authDispatch({
                type: "NAME",
                payload: evt.target.value
            })
        } else {
            console.log("Invalid Name")
        }
    }

    const handelEmailChange = (evt) => {
        isEmailValid = validateEmail(evt.target.value);
        if (isEmailValid) {
            authDispatch({
                type: "EMAIL",
                payload: evt.target.value
            })
        } else {
            console.log("Invalid Email")
        }
    }

    const handlePasswordChange = (evt) => {
        isPasswordValid = validatePassword(evt.target.value);
        if (isNameValid) {
            authDispatch({
                type: "PASSWORD",
                payload: evt.target.value
            })
        } else {
            console.log("Invalid Password")
        }
    }

    const handleConfirmPasswordChange = (evt) => {
        isConfirmPasswordValid = validatePassword(evt.target.value);
        if (isConfirmPasswordValid) {
            authDispatch({
                type: "CONFIRM_PASSWORD",
                payload: evt.target.value
            })
        } else {
            console.log("Invalid Password")
        }
    }

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        if(isNumberValid && isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid){
            signupHandler(username, number, email, password, setAlert);
        }
        authDispatch({
            type: "CLEAR_USER_DATA"
        })   
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleFormSubmit}>
                <div className="signup-1 lb-in-container">
                    <label className="auth-label">
                        Mobile Number
                    </label>
                    <input type="number" className="auth-input" maxLength="10"
                         placeholder="Enter Mobile Number" required defaultValue={number} onChange={handleNumberChange} />
                </div>
                <div className="signup-1 lb-in-container">
                    <label className="auth-label">
                        Name
                    </label>
                    <input type="text" className="auth-input" placeholder="Enter Name"
                        defaultValue={username} onChange={handleNameChange} required />
                </div>
                <div className="signup-1 lb-in-container">
                    <label className="auth-label">
                        Email
                    </label>
                    <input type="text" className="auth-input" placeholder="Email"
                        defaultValue={email} onChange={handelEmailChange} required />
                </div>
                <div className="signup-1 lb-in-container">
                    <label className="auth-label">
                        Password
                    </label>
                    <input type="password" className="auth-input" placeholder="Enter Password"
                        defaultValue={password} onChange={handlePasswordChange} required />
                </div>
                <div className="signup-1 lb-in-container">
                    <label className="auth-label">
                        Confirm Password
                    </label>
                    <input type="password" className="auth-input" placeholder="Enter Password"
                        defaultValue={confirmPassword} onChange={handleConfirmPasswordChange} required />
                </div>
                <div>
                    <button type="submit" className="button btn-primary btn-login authenticate">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
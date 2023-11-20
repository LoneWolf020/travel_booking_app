import axios from "axios";

export const signupHandler = async (username, number, email, password, setAlert) => {
    try {
        const data = await axios.post("https://weak-jade-calf-slip.cyclic.app/api/auth/register",
        {
            username: username,
            number: number,
            email: email,
            password: password
        })
        console.log("Signed Up");
        console.log(data);
        setAlert({
            open: true,
            message: `Account Created:: username - ${username}`,
            type: "success"
        })
    } catch (error) {
        console.log("error adding user to DB");
    }
}
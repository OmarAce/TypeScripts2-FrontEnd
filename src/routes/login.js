import { useState, useEffect } from 'react'
import Axios from 'axios'
import Type from './type';
import { Navigate } from 'react-router';
const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("Please Log In");

    Axios.defaults.withCredentials = true;

    async function Login({ credentials }) {
        Axios.post("http://localhost:3001/users/login", {
            username: username,
            password: password
        }).then((response) => {
            console.log(response)
            console.log(response.data.message)
            let userId = response.data.userId
            sessionStorage.setItem("userId", JSON.stringify(userId))
            if (response.status === 200) {
                setLoginStatus("Login Success");
            }
        })
    };

    async function Register({ credentials }) {
        Axios.post("http://localhost:3001/users/register", {
            username: username,
            password: password
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {

                setLoginStatus("Registered Successfully, Please Login");
                Login({username, password})
            }
        })
    };

    const handleLogin = async e => {
        setLoginStatus("Please Log In")
        e.preventDefault();
        Login({ username, password })
    }

    const handleRegister = async e => {
        setLoginStatus("Please Log In")
        e.preventDefault();
        Register({ username, password })
    }
    // useEffect(() => {
    //     const getUserData = async () => {
    //         Axios.get(`users/login?username=${username}&password=${password}`).then((response) => {
    //             if (response.data.loggedIn == true) {
    //                 setLoginStatus(response.data.user[0].username);
    //             }
    //         });
    //     }

    // }, []);



    return (
        <div className='w-full flex justify-center items-center'>
            <div className="flex flex-col items-center ">

                <h1>Login</h1>

                <form className='flex flex-col items-left' onSubmit={handleLogin}>
                    <label>
                        <p>Username:</p>
                        <input type="text" className='border-2 w-full text-black' onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        <p>Password:</p>
                        <input type="password" className='border-2 w-full text-black' onChange={e => setPassword(e.target.value)} />
                    </label>

                    <input type="submit" className='border-2 w-full' value="Login" />

                </form>

                <h1> Need to Register? </h1>

                <form className='flex flex-col items-left' onSubmit={handleRegister}>
                    <label>
                        <p>Username:</p>
                        <input type="text" className='border-2 w-full text-black' onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        <p>Password:</p>
                        <input type="password" className='border-2 w-full text-black' onChange={e => setPassword(e.target.value)} />
                    </label>

                    <input type="submit" className='border-2 w-full' value="Register" />

                </form>

                <h1>{loginStatus}</h1>
                {loginStatus === "Login Success" && (
                    <Navigate to="/" />
                )}
            </div>
        </div>
    )
}

export default Login
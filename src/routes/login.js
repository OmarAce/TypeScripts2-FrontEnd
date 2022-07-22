import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import Navbar from '../components/navigation'
const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("Please Log In");

    async function Login({ credentials }) {
        fetch("https://typescripts-server.herokuapp.com/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data)
                console.log(data.message)
                let userId = data.userId
                console.log(userId)
                sessionStorage.setItem("userId", JSON.stringify(userId))
                if (data.message === "You are logged in!") {
                    setLoginStatus("Login Success");
                }
            })
    };

    async function Register({ credentials }) {
        fetch("https://typescripts-server.herokuapp.com/users/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data)
                if (data.id) {
                    console.log('Registered Successfully')
                    setLoginStatus("Registered Successfully");
                    Login({ username, password })
                }
            })
    };



    const handleLogin = async e => {
        e.preventDefault();
        setLoginStatus("Logged in")
        Login({ username, password })
    }

    const handleRegister = async e => {
        e.preventDefault();
        setLoginStatus("Logged in")
        Register({ username, password })
    }

    const navigate = useNavigate();

    const refreshPage = () => {
        ;
    }
    if (loginStatus === "Login Success") {
        navigate('/');
    }

    return (
        <>
            <Navbar />
            <div className='w-full flex justify-center items-center'>
                <div className="flex flex-col items-center ">
                    <h1>{loginStatus}</h1>

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

                    {/* {loginStatus === "Login Success" && (
                    
                    navigate('/')
                    
                )} */}
                </div>
            </div>
        </>
    )
}

export default Login
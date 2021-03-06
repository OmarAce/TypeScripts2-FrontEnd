import { useState, useEffect } from 'react'
import Type from './type';
import { Navigate } from 'react-router';
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
            body: JSON.stringify({username, password})
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
            body: JSON.stringify({username, password})
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data)
            if (data.id) {
                console.log('Registered Successfully')
                setLoginStatus("Registered Successfully");
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
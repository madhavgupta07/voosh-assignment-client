
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
// import { useAuthStore } from "../zustand/authStore";
// import { useAuthStore } from './zustand/useAuthStore';

import useStore from '../zustand/authStore.js'
export default function Login() {


    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setLogin, setToken } = useStore();
    //   const {setIsLoggedIn} = useAuthStore();

    //   const {authName, updateAuthName} = useAuthStore();


    const loginFunc = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('https://voosh-assignment-server.onrender.com/api/auth/login', {
                username: username,
                password: password
            })

            console.log(res, "result")
            toast.success('Sign in successful');
            setLogin({
                user: res.data.user,
                token: res.data.token,
            })
            setToken({
                token: res.data.token
            })
            setTimeout(() => {
                navigate(`/task/${res.data.user._id}`)
            }, 2000);
        } catch (error) {
            toast.error(error.message);
            console.log("Error in login function : ", error.message);
        }
    }

    return (
        <div>
            <ToastContainer />
            <section className="bg-blue-500 text-black">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-blue-200 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={loginFunc}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium ">Your username</label>
                                    <input onChange={(e) => setUsername(e.target.value)} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium ">Password</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p className="text-sm font-light">
                                    Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => navigate("/")}>Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

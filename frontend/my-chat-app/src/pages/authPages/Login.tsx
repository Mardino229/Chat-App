import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axiosClient from "../../services/axios.tsx";
import {LOGIN_URL} from "../../constants";
import useAuth from "../../hooks/useAuth.tsx";

interface LoginFormData {
    username: string;
    password: string;
}

interface FormErrors {
    username?: string;
    password?: string;
}


export default function Login(){

    // @ts-ignore
    const { setAuth } = useAuth();

    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/quickmessage";

    const validate = (): FormErrors => {
        const errors: FormErrors = {};

        if (!formData.username) {
            errors.username = 'Username is required';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        return errors;
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);
        setServerError(null);

        try {
            const response = await axiosClient.post(LOGIN_URL, formData);
            console.log('User connected:', response.data);
            const accessToken = response.data.accessToken;
            const username = response.data.username;
            setAuth({username,accessToken});
            navigate(from, {replace:true})
        } catch (error) {
            console.log(error)
            // @ts-ignore
            setServerError(error.response?.data.message || "Internal Server Error");
            setIsSubmitting(false)
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
        <>
            <p className="text-center font-light text-2xl mb-4">Sign in to QuickChat</p>
            <form onSubmit={handleSubmit} className="border-2 p-5  rounded-lg mx-2">
                {serverError && <p className="text-center text-red-500">{serverError}</p>}
                <div className="mb-5">
                    <label htmlFor="website-admin"
                           className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Username</label>
                    <div className="flex">
                        <span
                            className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                               xmlns="http://www.w3.org/2000/svg"
                               fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                          </svg>
                        </span>
                        <input type="text" id="website-admin"
                               name="username"
                               value={formData.username}
                               onChange={handleInputChange}
                               className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Mark Zuckerberg"/>
                    </div>
                    {errors.username && <p className="text-red-500">{errors.username}</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Your
                        password</label>
                    <input type="password" id="password"
                           name="password"
                           value={formData.password}
                           onChange={handleInputChange}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>
                {/*<div className="flex items-start mb-5">*/}
                {/*    <div className="flex items-center h-5">*/}
                {/*        <input id="remember" type="checkbox" value=""*/}
                {/*               className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"*/}
                {/*               required/>*/}
                {/*    </div>*/}
                {/*    <label htmlFor="remember" className="ms-2 text-sm font-bold text-gray-900 dark:text-gray-300">Remember*/}
                {/*        me</label>*/}
                {/*</div>*/}
                <div className="flex flex-wrap justify-between items-center">
                    <Link to="/signup"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <button>
                            Signup
                        </button>
                    </Link>
                    <p className="text-center font-bold text-gray-600 text-2xl w-full sm:w-auto">-- Or --</p>
                    <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {isSubmitting ? 'Sign in...' : 'Login'}
                    </button>
                </div>
            </form>
            <div className="mt-5 mx-auto">
                <div className="flex justify-around items-center">
                    <div className="">
                        <img width="100" height="100" src="https://img.icons8.com/clouds/100/google-logo.png"
                             alt="google-logo"/>
                    </div>
                    <div className="">
                        <img width="100" height="100" src="https://img.icons8.com/clouds/100/facebook-new.png"
                             alt="facebook-new"/>
                    </div>
                </div>
            </div>
        </>
    )
}
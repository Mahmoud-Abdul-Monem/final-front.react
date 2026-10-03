import test from "../../../assets/Icon.svg";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { TfiEmail, TfiEye, TfiLock } from "react-icons/tfi";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { LuUserRound } from "react-icons/lu";

export default function RegisComp() {
    const regisSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .required('Username is required'),

        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),

        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
            .required('Password is required'),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Please confirm your password')
    });

    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [regisError, setRegisError] = useState("");

    const registerUser = async (values: any) => {
        await axios.post('http://localhost:1337/api/auth/local/register', {
            username: values.username,
            email: values.email,
            password: values.password
        })
            .then(response => {
                const token = response.data.jwt;
                localStorage.setItem("jwt", token);
                navigate('/');
            })
            .catch(error => {
                setRegisError("username or email is taken");
            });
    };

    const passwordStatus = () => {
        setShowPassword(!showPassword);
    };

    const EyeIcon = showPassword ? FaEyeSlash : TfiEye;

    return (
        <div className="flex p-6 w-full justify-center items-center rounded-xl flex-col shadow-2xl bg-white gap-4 md:gap-6 lg:gap-8">
            <div className="flex justify-center items-center gap-3 flex-col">
                <div className="w-16 h-16 bg-primary-store rounded-full flex justify-center items-center">
                    <img src={test} className="w-7.5 h-7.5" alt="avatar logo" />
                </div>

                <div className="flex justify-center flex-wrap items-center gap-1 flex-col text-center">
                    <h3 className="font-semibold text-xl md:text-2xl leading-8">Create Account</h3>
                    <p className="text-footer-color leading-6 text-[14px] md:text-[16px] max-w-62.5">
                        Join Luminous Marketplace for an elevated shopping experience.
                    </p>
                </div>

                <div className="grid grid-cols-2">
                    <Link to="/auth/login" className={`text-footer-color transition-all duration-450 ease-in-out cursor-pointer flex justify-center items-center border-b-2 min-w-37.5 md:min-w-50 border-footer-color/20 ${pathname.includes("/login") ? "border-footer-primary text-footer-primary hover:text-green-700 hover:border-green-600" : "hover:text-footer-primary/65 hover:border-footer-primary/65"}`}>
                        <p className="mb-3">Login</p>
                    </Link>
                    <Link to="/auth/register" className={`text-footer-color transition-all duration-450 ease-in-out cursor-pointer flex justify-center items-center border-b-2 min-w-37.5 md:min-w-50 border-footer-color/20 ${pathname.includes("/register") ? "border-footer-primary text-footer-primary hover:text-green-700 hover:border-green-600" : "hover:text-footer-primary/50 hover:border-footer-primary/50"}`}>
                        <p className="mb-3">Register</p>
                    </Link>
                </div>

                <Formik initialValues={{ username: '', email: '', password: '', confirmPassword: '' }} validationSchema={regisSchema} onSubmit={registerUser}>
                    {({ errors, values }) => (
                        <Form className="flex flex-col w-full gap-4" onChange={() => { setRegisError("") }}>
                            <div className="username-div relative">
                                <label htmlFor="name" className="text-[12px] font-medium text-footer-color">Full Name</label>
                                <div className="absolute inset-y-13 inset-s-3 flex items-center pointer-events-none">
                                    <LuUserRound className="text-gray-400" />
                                </div>
                                <Field
                                    name="username" id="name" type="text" placeholder="e.g. Jane Doe"
                                    className={`rounded-lg block focus:outline-0 mt-1 w-full p-3 pl-10 border ${!values.username ? 'border-gray-300' : errors.username ? 'border-red-600' : 'border-green-600'}`}
                                />
                                <ErrorMessage
                                    name="username"
                                    component="p"
                                    className="text-red-600 text-[12px] mt-1"
                                />
                            </div>

                            <div className="email-div relative">
                                <label htmlFor="email" className="text-[12px] font-medium text-footer-color">Email Address</label>
                                <div className="absolute inset-y-13 inset-s-3 flex items-center pointer-events-none">
                                    <TfiEmail className="text-gray-400" />
                                </div>
                                <Field
                                    name="email" id="email" type="email" placeholder="name@example.com"
                                    className={`rounded-lg block focus:outline-0 mt-1 w-full p-3 pl-10 border ${!values.email ? 'border-gray-300' : errors.email ? 'border-red-600' : 'border-green-600'}`}
                                />
                                <ErrorMessage
                                    name="email"
                                    component="p"
                                    className="text-red-600 text-[12px] mt-1"
                                />
                            </div>

                            <div className="password-div relative">
                                <label htmlFor="password" className="text-[12px] font-medium text-footer-color">Password</label>
                                <div className="absolute inset-y-13 inset-s-3 flex items-center pointer-events-none">
                                    <TfiLock className="text-gray-400" />
                                </div>

                                <Field
                                    name="password" id="password" type={showPassword === false ? "password" : "text"} placeholder="••••••••"
                                    className={`rounded-lg block focus:outline-0 mt-1 w-full p-3 pl-10 border ${!values.password ? 'border-gray-300' : errors.password ? 'border-red-600' : 'border-green-600'}`}
                                />
                                <button
                                    className="absolute cursor-pointer inset-y-13 inset-e-3 flex items-center"
                                    type="button"
                                    onClick={passwordStatus}>
                                    <EyeIcon className="text-gray-400 text-lg" />
                                </button>

                                <ErrorMessage
                                    name="password"
                                    component="p"
                                    className="text-red-600 text-[12px] mt-1 "
                                />
                            </div>

                            <div className="password-div relative">
                                <label htmlFor="confirm-pass" className="text-[12px] font-medium text-footer-color">Confirm Password</label>
                                <div className="absolute inset-y-13 inset-s-3 flex items-center pointer-events-none">
                                    <TfiLock className="text-gray-400" />
                                </div>

                                <Field
                                    name="confirmPassword" id="confirm-pass" type={showPassword === false ? "password" : "text"} placeholder="••••••••"
                                    className={`rounded-lg block focus:outline-0 mt-1 w-full p-3 pl-10 border ${!values.confirmPassword ? 'border-gray-300' : errors.confirmPassword ? 'border-red-600' : 'border-green-600'}`}
                                />
                                <button
                                    className="absolute cursor-pointer inset-y-13 inset-e-3 flex items-center"
                                    type="button"
                                    onClick={passwordStatus}>
                                    <EyeIcon className="text-gray-400 text-lg" />
                                </button>

                                <ErrorMessage
                                    name="confirmPassword"
                                    component="p"
                                    className="text-red-600 text-[12px] mt-1 "
                                />
                            </div>

                            {regisError && (
                                <p className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-[14px]">{regisError}</p>
                            )}

                            <button type="submit" disabled={Boolean(errors.password || errors.email || errors.username || errors.confirmPassword)}
                                className={`w-full transition-all duration-400 ease-in-out p-3 rounded-lg text-white flex justify-center text-[14px] leading-5 font-semibold items-center ${errors.password || errors.email || errors.username || errors.confirmPassword || !values.username || !values.password || !values.confirmPassword || !values.email ? 'bg-gray-400' : 'cursor-pointer bg-primary-store hover:shadow-lg hover:-translate-y-0.5 hover:bg-green-800 border-green-600'}`}>
                                Create Account
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="max-w-[384px] text-4 leading-6 flex flex-wrap items-center gap-1 text-footer-color justify-center">
                    By creating an account, you agree to our
                    <span className="cursor-pointer text-footer-primary font-medium">
                        Terms of Service
                    </span>
                    and
                    <span className="cursor-pointer text-footer-primary font-medium">
                        Privacy Policy
                    </span>
                </p>
            </div>
        </div>
    );
}
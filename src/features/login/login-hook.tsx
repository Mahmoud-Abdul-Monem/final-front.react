import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { TfiEye } from "react-icons/tfi";
import { FaEyeSlash } from "react-icons/fa";

export interface LoginValues {
    identifier: string;
    password: string;
}

export const useLogin = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");

    const loginSchema = Yup.object().shape({
        identifier: Yup.string().email("wrong email").required("email is required"),
        password: Yup.string().min(6, "password too short").required("Required"),
    });

    const loginUser = async (values: LoginValues) => {
        setLoginError("");
        try {
            const response = await axios.post(`http://localhost:1337/api/auth/local`, {
                identifier: values.identifier,
                password: values.password,

            });


            const token = response.data.jwt;
            localStorage.setItem("jwt", token);
            navigate("/", { replace: true });



        } catch (error) {
            setLoginError("Email or Password is incorrect");
        }
    };


    const EyeIcon = showPassword ? FaEyeSlash : TfiEye;

    return {
        pathname,
        showPassword,
        setShowPassword,
        loginError,
        setLoginError,
        loginSchema,
        loginUser,
        EyeIcon,
    };
};
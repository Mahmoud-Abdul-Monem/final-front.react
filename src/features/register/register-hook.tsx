import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { TfiEye } from "react-icons/tfi";
import { FaEyeSlash } from "react-icons/fa";

export interface RegisterValues {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export const useRegister = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [regisError, setRegisError] = useState("");

    const regisSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, "Username must be at least 3 characters")
            .required("Username is required"),

        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),

        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .matches(/[a-zA-Z]/, "Password must contain at least one letter")
            .required("Password is required"),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Please confirm your password"),
    });

    const registerUser = async (values: RegisterValues) => {
        setRegisError("");
        try {
            await axios.post(
                `http://localhost:1337/api/auth/local/register`,
                {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                },
                {
                    withCredentials: true,
                }
            );

            navigate("/");
        } catch (error) {
            setRegisError("username or email is taken");
        }
    };

    const EyeIcon = showPassword ? FaEyeSlash : TfiEye;

    return {
        pathname,
        showPassword,
        setShowPassword,
        regisError,
        setRegisError,
        regisSchema,
        registerUser,
        EyeIcon,
    };
};  
import { Route, Routes, } from "react-router-dom";
import Home from "./pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import AuthLayout from "@/features/layouts/AuthLayout";

export default function App() {

	return (

		<Routes>

			<Route path="/" element={<Home />} />
			<Route element={<AuthLayout />} >
				<Route path="register" element={<Register />} />
				<Route path="login" element={<Login />} />
			</Route >


		</Routes>

	)
}
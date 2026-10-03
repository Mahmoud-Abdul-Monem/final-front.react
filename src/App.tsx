import { Route, Routes, } from "react-router-dom";
import Home from "./pages/Home";
import AuthLayout from "./app/layouts/AuthLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";

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
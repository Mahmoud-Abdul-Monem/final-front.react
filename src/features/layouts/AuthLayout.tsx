import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="h-dvh w-full">
            <div className="w-full flex justify-center items-center h-dvh bg-login-bgc">
                <Outlet />
            </div>
        </div>
    );
}
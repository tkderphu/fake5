import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {
    if(localStorage.getItem("auth-token") == null) {
        return <Navigate to={"/login"} />
    }
    return <Outlet/>
}
"use client";

import { useRouter } from "next/navigation"

const Logout = () => {
    const router = useRouter()
    const logout = () => {
        localStorage.removeItem("token")
        router.push("/")
    }

    return (
        <div>
            <button className="btn btn-dark" onClick={logout}>Logout</button>
        </div>
    );
}
 
export default Logout;
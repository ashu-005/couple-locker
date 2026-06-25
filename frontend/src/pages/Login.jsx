import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const [mobile, setMobile] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        try {
            const response = await api.post("/auth/login", {
                mobile
            });

            console.log(response.data);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login Success");

            navigate("/dashboard");

        } catch (error) {
            console.log(error);
            alert("User Not Found");
        }
    };

    return (
        <div>
            <h1>Couple Locker Login</h1>

            <input
                type="text"
                placeholder="Enter Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />

            <br />
            <br />

            <button onClick={login}>
                Login
            </button>
        </div>
    );
}

export default Login;

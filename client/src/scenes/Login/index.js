import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../utils/AuthContext"; // Correct import path as needed

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.isAdmin) {
                navigate('/admin/dashboard');
            } else if (user.isSurveyor) {
                navigate('/surveyor/dashboard');
            } else if (user.isRespondent) {
                navigate('/respondent/dashboard');
            } 
            
        }
    }, [user, navigate]); // React to changes in user

    const handleLogin = async (e) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <div className="wrapper">
            <div className="login-container">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <FaUser className="icon" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <FaLock className="icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;

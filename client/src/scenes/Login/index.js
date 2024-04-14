import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa"; // Ensure these are imported
import { useAuth } from "../utils/AuthContext";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!error && user) {
            // Navigate based on role
            switch (user.role) {
                case 'Admin':
                    navigate('/admin/dashboard');
                    break;
                case 'Surveyor':
                    navigate('/surveyor/dashboard');
                    break;
                case 'Respondent':
                    navigate('/respondent/dashboard');
                    break;
                default:
                    navigate('/');
                    break;
            }
        }
    }, [error, user, navigate]); // React to changes in error, user, or navigate

    const handleLogin = async (e) => {
        e.preventDefault();
        login(username, password); // Await is not needed here as useEffect will react to state changes
    };

    return (
        <div className="wrapper">
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <FaUser className="icon" />
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="input-group">
                    <FaLock className="icon" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
        </div>
    );
};

export default Login;



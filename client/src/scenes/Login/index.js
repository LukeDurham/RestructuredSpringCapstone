import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { login } from "../utils/authentication"; // Adjust the path as needed

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(username, password);
            console.log('Login Successful', userData); // You might want to do something more useful here
            // Based on user role, navigate to different dashboards
            if (userData.role === 'Admin') {
                navigate('/admin/dashboard');
            } else if (userData.role === 'Surveyor') {
                navigate('/surveyor/dashboard');
            } else if (userData.role === 'Respondent') {
                navigate('/respondent/dashboard');
            } else {
                navigate('/'); // Default navigation
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>} {/* Display error message */}
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
    );
};

export default Login;

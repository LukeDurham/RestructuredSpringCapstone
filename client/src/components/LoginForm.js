import React from 'react';
import LoginInput from './LoginInput';

const LoginForm = ({ onLogin, username, setUsername, email, setEmail }) => {
    return (
        <form onSubmit={onLogin} style={{ padding: '30px 40px' }}> {/* Add specific styles or reference a style object here if needed */}
            <h1>Login</h1>
            <LoginInput
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                icon="user"
            />
            <LoginInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon="envelope"
            />

            {/* Inline styles for .forgot, button, and .register-link can be added directly or defined as objects */}
            <div className="forgot" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14.5px', margin: '-15px 0 15px' }}>
                <label><input type="checkbox" />Remember Me</label>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Forgot Password?</a>
            </div>
            <button type="submit" style={{ width: '100%', height: '45px', backgroundColor: '#fff', border: 'none', borderRadius: '40px', boxShadow: '0 0 10px rgba(0, 0, 0, .1)', cursor: 'pointer', fontSize: '16px', color: '#333', fontWeight: '700' }}>Login</button>
            <div className="register-link" style={{ fontSize: '14.5px', textAlign: 'center', margin: '20px 0 15px' }}>
                <p>Don't have an account? <a href="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: '600' }}>Register</a></p>
            </div>
        </form>
    );
};

export default LoginForm;

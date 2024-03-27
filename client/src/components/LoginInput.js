import React from 'react';
import { FaUser, FaEnvelope } from "react-icons/fa";

const iconStyle = {
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '16px',
};

const LoginInput = ({ type, placeholder, value, onChange, icon }) => {
    const Icon = icon === 'user' ? FaUser : FaEnvelope;
    return (
        <div className="input-box" style={{ position: 'relative', width: '100%', height: '50px', margin: '30px 0' }}>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
                style={{ width: '100%', height: '100%', background: 'transparent', border: '2px solid rgba(255, 255, 255, .2)', outline: 'none', borderRadius: '40px', fontSize: '16px', color: 'aliceblue', padding: '20px 45px 20px 20px' }}
            />
            <Icon className="icon" style={iconStyle} />
        </div>
    );
};

export default LoginInput;

import React from 'react';
import { useAuth } from '../../scenes/utils/AuthContext';

const UserProfile = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>Please log in</div>;
    }

    return <div>Welcome, {user.username}</div>;
};

export default UserProfile;

import React from "react";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const goToCreateUser = () => {
        navigate('/createuser'); // Programmatically navigate to /createuser route
    };
    const goToCreateRole = () => {
        navigate('/createrole'); // Programmatically navigate to /createrole route
    };
    const goToAssignUserRole = () => {
        navigate('/admin/assign-user-role'); // Programmatically navigate to /admin/assign-user-role route
    };
    const goToUserPermissions = () => {
        navigate('/admin/user-permissions'); // Programmatically navigate to /admin/user-permissions route
    };

    const goToSurveyDashboard = () => {
        navigate('/surveydashboard'); // Programmatically navigate to /login route
    };

    return (
        <div> {/* Wrap the buttons in a div */}
            <h1>Admin Dashboard</h1>
            <button onClick={goToCreateUser} className="login-button">Create User</button>
            <button onClick={goToCreateRole} className="login-button">Create Role</button>
            <button onClick={goToAssignUserRole} className="login-button">Assign User Role</button>
            <button onClick={goToUserPermissions} className="login-button">Assign Permissions</button>
            <button onClick={goToSurveyDashboard} className="login-button">Survey Dashboard</button>
        </div>
    );
};

export default AdminDashboard;

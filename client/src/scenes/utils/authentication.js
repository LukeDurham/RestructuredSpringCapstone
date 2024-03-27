const API_URL = "http://localhost:5000"; // Base URL

// Function to handle user login
export const login = async (username, password) => {
    const LOGIN_URL = `${API_URL}/api/login`; // Specific endpoint for login
    try {
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();
        return data; // Contains userId and role
    } catch (error) {
        console.error("Login Error:", error);
        throw error; // Rethrow to handle it in the calling code
    }
};

// Function to check if the current user is an admin
export const isAdminUser = async (userId) => {
    const ADMIN_ROUTE_URL = `${API_URL}/api/adminRoute/${userId}`; // Specific endpoint for checking admin status
    try {
        const response = await fetch(ADMIN_ROUTE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user role');
        }

        const data = await response.json();
        return data.role_id === 1; // Returns true if the user is an admin
    } catch (error) {
        console.error("Error checking admin role:", error);
        return false; // Assume not an admin if there's an error
    }
};

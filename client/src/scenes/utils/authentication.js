const API_URL = "http://localhost:5000/api/login"; // Update with your actual backend URL

export const login = async (username, password) => {
    const response = await fetch(API_URL, {
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
};

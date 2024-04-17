const bcrypt = require('bcrypt');

// Sample user input
const username = 'admin';
const email = 'admin@gmail.com';
const password = 'admin@gmail.com';

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);  // Generate the salt
        const hashedPassword = await bcrypt.hash(password, salt);  // Hash the password with the salt
        console.log(`Username: ${username}`);
        console.log(`Email: ${email}`);
        console.log(`Hashed Password: ${hashedPassword}`);
    } catch (error) {
        console.error('Error hashing password:', error);
    }
}

hashPassword(password);

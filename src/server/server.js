require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// Ensure you're importing the pool instance correctly
const pool = require('./dbSetup');

const app = express();

// Function to generate a random integer ID
function generateRandomInteger() {
    // Generate a random number between 1 and 1000000 (adjust the range as needed)
    return Math.floor(Math.random() * 1000000) + 1;
}


app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.json({ "users": ["Admin", "Surveyor", "Respondent"] });
});



//get user roles
app.get("/api/roles", async (req, res) => {
    try {
        // Query the database to get role IDs and names
        const queryResult = await pool.query('SELECT id, name FROM roles');

        // Send the roles with their IDs and names as JSON response
        res.json({ roles: queryResult.rows });
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ message: 'Failed to fetch roles' });
    }
});


app.post("/api/roles", async (req, res) => {
    const { name } = req.body;
    try {
        // Generate a random integer ID for the role
        const roleId = generateRandomInteger();

        // Insert the role into the database
        const result = await pool.query(
            "INSERT INTO roles (id, name, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *;",
            [roleId, name]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ message: 'Failed to create role' });
    }
});



app.get("/api/get_question_types", async (req, res) => {
    try {
        // Query the database to get the unique names of question types
        const queryResult = await pool.query('SELECT DISTINCT name FROM question_types');

        // Extract the names from the query result
        const questionTypes = queryResult.rows.map(row => row.name);

        // Send the unique question types as JSON response
        res.json({ questionTypes });
    } catch (error) {
        console.error('Error fetching question types:', error);
        res.status(500).json({ message: 'Failed to fetch question types' });
    }
});

app.post("/api/question_types", async (req, res) => {
    const { name } = req.body;
    try {
        // Generate a random integer ID for the question type
        const questionTypeId = generateRandomInteger();

        const result = await pool.query(
            "INSERT INTO question_types (id, name, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *;",
            [questionTypeId, name]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating question type:', error);
        res.status(500).json({ message: 'Failed to create question type' });
    }
});



//endpoint for creating a question
app.post("/api/questions", async (req, res) => {
    const { question_type, question, options } = req.body;

    try {
        // Generate a random integer ID for the question
        const question_id = generateRandomInteger();

        // Find the question type ID based on the question type name
        const questionTypeResult = await pool.query('SELECT id FROM question_types WHERE name = $1', [question_type]);
        const question_type_id = questionTypeResult.rows[0].id;

        // Insert the question into the database
        const result = await pool.query(
            "INSERT INTO questions (id, question_type_id, question, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *;",
            [question_id, question_type_id, question]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ message: 'Failed to create question' });
    }
});






// Endpoint for creating a new user
app.post("/api/users", async (req, res) => {
    const { username, email } = req.body;

    try {
        // Start a transaction
        await pool.query('BEGIN');

        // Get the current number of users to determine the next ID
        const countRes = await pool.query('SELECT COUNT(*) FROM users');
        const nextId = parseInt(countRes.rows[0].count, 10) + 1;

        // Insert the new user with the calculated ID
        const insertRes = await pool.query(
            "INSERT INTO users (id, username, email, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *;",
            [nextId, username, email]
        );

        // Commit the transaction
        await pool.query('COMMIT');

        res.status(201).json(insertRes.rows[0]);
    } catch (error) {
        // Rollback the transaction in case of error
        await pool.query('ROLLBACK');

        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
});


//Get all user emails and IDs
app.get("/api/users", async (req, res) => {
    try {
        // Query the database to get all user emails and their IDs
        const queryResult = await pool.query('SELECT id, email FROM users');

        // Send the query result as JSON response
        res.json(queryResult.rows);
    } catch (error) {
        console.error('Error fetching user emails and IDs:', error);
        res.status(500).json({ message: 'Failed to fetch user emails and IDs' });
    }
});

// Endpoint for creating a new question
app.post("/api/questions", async (req, res) => {
    const { question_type_id, question, created_at, updated_at } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO questions (question_type_id, question, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *;",
            [question_type_id, question, created_at, updated_at]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ message: 'Failed to create question' });
    }
});


//api call for assign-user-role
app.post("/api/assign_role", async (req, res) => {
    const { userId, roleId } = req.body; // Correctly use userId and roleId

    try {
        await pool.query('BEGIN');

        // Generate a random ID for user_roles entry. Consider using a sequence or UUID in production for uniqueness.
        const randomId = Math.floor(Math.random() * 1000000);

        // Insert the new record with the provided userId and roleId
        await pool.query(
            "INSERT INTO user_roles (id, user_id, role_id) VALUES ($1, $2, $3)",
            [randomId, userId, roleId]
        );

        await pool.query('COMMIT');
        res.status(201).json({ message: 'Role assigned successfully' });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error assigning role:', error);
        res.status(500).json({ message: 'Failed to assign role' });
    }
});

//create Survey Template

app.post("/api/survey_templates", async (req, res) => {
    const { name } = req.body;

    try {
        // Generate a random ID for the survey template
        // Consider using a more reliable method like UUIDs for production
        const id = Math.floor(Math.random() * 1000000);

        // Insert the survey template into the database
        await pool.query(
            "INSERT INTO survey_templates (id, name) VALUES ($1, $2)",
            [id, name]
        );

        res.status(201).json({ message: 'Survey template created successfully', id });
    } catch (error) {
        console.error('Error creating survey template:', error);
        res.status(500).json({ message: 'Failed to create survey template' });
    }
});


//login api endpoint 
app.post("/api/login", async (req, res) => {
    const { username, email } = req.body;

    try {
        const userRes = await pool.query(
            'SELECT id FROM users WHERE username = $1 AND email = $2',
            [username.trim(), email.trim()]
        );

        if (userRes.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = userRes.rows[0];

        const userRolesRes = await pool.query(
            'SELECT role_id FROM user_roles WHERE user_id = $1',
            [user.id]
        );

        if (userRolesRes.rows.length === 0) {
            return res.status(404).json({ message: 'No roles found for user' });
        }

        let userRole = null; // Keep track of the user's role
        for (const userRoleRow of userRolesRes.rows) {
            const rolesRes = await pool.query(
                'SELECT name FROM roles WHERE id = $1',
                [userRoleRow.role_id]
            );

            if (rolesRes.rows.length > 0) {
                const roleName = rolesRes.rows[0].name;
                if (roleName === 'Admin' || roleName === 'Surveyor') {
                    userRole = roleName; // Set role to Admin or Surveyor
                    break; // Stop once a matching role is found
                }
            }
        }

        res.json({ role: userRole }); // Respond with the user's role

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed due to server error' });
    }
});






app.listen(5000, () => {
    console.log("Server started on port 5000");
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const pool = require('./config/dbSetup');

const bodyParser = require('body-parser');


const app = express();
app.use(express.json());



// app.use(bodyParser.json());
app.use(cors());




app.get("/api", (req, res) => {
    res.json({ "users": ["Admin", "Surveyor", "Respondent"] });
});




app.post("/api/CreatingSurveyTemplate/survey_templates", async (req, res) => {
    const { name, description, created_by } = req.body;
    const client = await pool.connect();
    try {
        const insertSurveyTemplateQuery = `
            INSERT INTO survey_templates
            (name, description, created_at, created_by, updated_at, updated_by)
            VALUES ($1, $2, NOW(), $3, NOW(), $3)
            RETURNING id
        `;
        const result = await client.query(insertSurveyTemplateQuery, [name, description, created_by]);
        const surveyTemplateId = result.rows[0].id;

        res.status(201).json({ message: 'Survey template successfully saved.', id: surveyTemplateId });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save survey template.', error: error.message });
    } finally {
        client.release();
    }
});

app.post("/api/CreatingSurveyTemplate/questions", async (req, res) => {
    const { questions } = req.body; // Expecting an array of { question_type_id, question }
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const questionIds = [];

        for (const question of questions) {
            const questionInsertQuery = 'INSERT INTO questions (question_type_id, question) VALUES ($1, $2) RETURNING id';
            const result = await client.query(questionInsertQuery, [question.question_type_id, question.question]);
            questionIds.push(result.rows[0].id);
        }

        await client.query('COMMIT');
        res.status(201).json({ message: 'Questions successfully saved.', questionIds });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(500).json({ message: 'Failed to save questions.', error: error.message });
    } finally {
        client.release();
    }
});

app.post("/api/CreatingSurveyTemplate/survey_template_questions", async (req, res) => {
    const { surveyTemplateId, questionIds } = req.body;
    const userId = req.user?.id || 0; // Adjust according to how you're handling user authentication
    // Assuming you're obtaining the description for the survey template in another part of your application
    const description = "Placeholder for survey template description"; // Replace or fetch dynamically as needed

    console.log("Received request:", JSON.stringify(req.body, null, 2));

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const insertQuery = `
            INSERT INTO survey_template_questions
            (question_id, survey_template_id, description, created_at, created_by, updated_at, updated_by)
            VALUES ($1, $2, $3, NOW(), $4, NOW(), $5)`;

        for (const questionId of questionIds) {
            await client.query(insertQuery, [questionId, surveyTemplateId, description, userId, userId]);
            console.log(`Inserted: questionId ${questionId}, surveyTemplateId ${surveyTemplateId}`);
        }

        await client.query('COMMIT');
        res.status(201).json({ message: 'Survey template and questions successfully linked.' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Failed to link survey template and questions:", error);
        res.status(500).json({
            message: 'Failed to link survey template and questions.',
            error: error.message
        });
    } finally {
        client.release();
    }
});


//get respondent active surveys
app.get('/api/personalactivesurveys', async (req, res) => {
    try {
        const surveys = await Survey.findAll(); // Assuming you're using an ORM like Sequelize
        res.json(surveys);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch surveys.' });
    }
});







app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if user exists
        const userResult = await pool.query('SELECT id, password FROM users WHERE username = $1', [username]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = userResult.rows[0];

        // Compare hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Fetch the first role for the user
        const roleResult = await pool.query('SELECT role_id FROM user_roles WHERE user_id = $1 LIMIT 1', [user.id]);
        if (roleResult.rows.length === 0) {
            return res.status(401).json({ error: 'No roles found for user' });
        }

        const roleId = roleResult.rows[0].role_id;

        const responsePayload = { userId: user.id, roleId };

        // Log the response payload to console before sending it
        console.log('Sending login response:', responsePayload);

        // Respond with user info and role id
        res.json(responsePayload);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



//protected routes for Admin
app.get('/api/adminRoute', async (req, res) => {
    try {
        const { userId } = req.params;
        const query = `SELECT user_id, role_id FROM user_roles WHERE user_id = $1`;
        const { rows } = await pool.query(query, [userId]);

        if (rows.length > 0) {
            // Sending back both user_id and role_id
            res.json({ user_id: rows[0].user_id, role_id: rows[0].role_id });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//protected routes for Surveyors
app.get('/api/surveyorRoute', async (req, res) => {
    try {
        const { userId } = req.params;
        const query = `SELECT user_id, role_id FROM user_roles WHERE user_id = $1`;
        const { rows } = await pool.query(query, [userId]);

        if (rows.length > 0) {
            // Sending back both user_id and role_id
            res.json({ user_id: rows[0].user_id, role_id: rows[0].role_id });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



//login api endpoint with bcryptjs
// app.post('/api/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         // Check if user exists
//         const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
//         if (userResult.rows.length === 0) {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }

//         const user = userResult.rows[0];

//         // Verify password (assuming you're storing hashed passwords)
//         const isValid = await bcrypt.compare(password, user.password);
//         if (!isValid) {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }

//         // Fetch user role
//         const roleResult = await pool.query('SELECT r.name AS role FROM user_roles ur JOIN roles r ON ur.role_id = r.id WHERE ur.user_id = $1', [user.id]);
//         const role = roleResult.rows[0]?.role;

//         // Respond with user role
//         res.json({ userId: user.id, role });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });



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

// Create a new role
//3/25/2024 made to have create role page to work with permissions.
app.post("/api/roles", async (req, res) => {
    try {
        const { name } = req.body;

        // Check if role name is provided
        if (!name) {
            return res.status(400).json({ message: 'Role name is required' });
        }

        // Query the database to insert a new role
        const queryResult = await pool.query('INSERT INTO roles (name) VALUES ($1) RETURNING id, name', [name]);

        // Send the newly created role as JSON response
        res.status(201).json({ role: queryResult.rows[0] });
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ message: 'Failed to create role' });
    }
});



app.get('/api/getroles', async (req, res) => {
    try {
        const rolesResult = await db.query(`SELECT name FROM roles`);
        const roleNames = rolesResult.rows.map(row => row.name);
        res.json({ roles: roleNames });
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).send('Server error during fetching roles.');
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
app.post("/api/createuser", async (req, res) => {
    const { username, email, password, roleId } = req.body;
    console.log(req.body);


    try {
        // Start a transaction
        await pool.query('BEGIN');

        // Hash the password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the new user with hashed password into the users table
        const userInsertRes = await pool.query(
            "INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id;",
            [username, email, hashedPassword]
        );

        const userId = userInsertRes.rows[0].id;

        // Assuming id in user_roles is auto-increment, you don't need to insert it manually
        // Insert the user_id and role_id into the user_roles table
        await pool.query(
            "INSERT INTO user_roles (user_id, role_id, created_at, updated_at) VALUES($1, $2, NOW(), NOW());",
            [userId, roleId] // Correctly positioned as the second argument to pool.query
        );


        // Commit the transaction
        await pool.query('COMMIT');

        res.status(201).json({ message: 'User created successfully', user: { username: username } });
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

app.post("/api/addQuestions", async (req, res) => {
    const { questions } = req.body;

    console.log(req.body);




    try {
        const results = await Promise.all(questions.map(async (q) => {
            // Assuming `type` maps to `question_type_id` and `text` maps to `question`
            const result = await pool.query(
                "INSERT INTO questions (question_type_id, question, created_at, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *;",
                [q.type, q.text] // Use CURRENT_TIMESTAMP for created_at and updated_at
            );
            return result.rows[0];
        }));

        res.status(201).json(results); // Send back an array of inserted questions
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ message: 'Failed to create question' });
    }
});





//create Survey Template

app.post("/api/survey_templates", async (req, res) => {
    const { name } = req.body;

    try {
        // Insert the survey template into the database without specifying the ID
        const result = await pool.query(
            "INSERT INTO survey_templates (name) VALUES ($1) RETURNING id",
            [name]
        );

        // Retrieve the auto-generated ID
        const id = result.rows[0].id;

        res.status(201).json({ message: 'Survey template created successfully', id });
    } catch (error) {
        console.error('Error creating survey template:', error);
        res.status(500).json({ message: 'Failed to create survey template' });
    }
});


// Endpoint to fetch all survey templates
app.get("/api/survey_templates", async (req, res) => {
    try {
        // Query the database to get all survey templates
        const queryResult = await pool.query('SELECT * FROM survey_templates');

        // Send the survey templates as JSON response
        res.json({ survey_templates: queryResult.rows });
    } catch (error) {
        console.error('Error fetching survey templates:', error);
        res.status(500).json({ message: 'Failed to fetch survey templates' });
    }
});


// Endpoint for creating a survey question
app.post("/api/survey_questions", async (req, res) => {
    const { survey_template_id, question_id, description } = req.body;

    try {
        // Insert the survey question into the database
        const result = await pool.query(
            "INSERT INTO survey_template_questions (survey_template_id, question_id, description, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *;",
            [survey_template_id, question_id, description]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating survey question:', error);
        res.status(500).json({ message: 'Failed to create survey question' });
    }
});

app.get('/api/search_templates', async (req, res) => {
    const searchText = req.query.text; // Get search text from query parameters
    try {
        const templateQuery = await pool.query(
            'SELECT * FROM survey_templates WHERE name ILIKE $1 ORDER BY id ASC',
            [`%${searchText}%`]
        );

        if (templateQuery.rows.length > 0) {
            const template = templateQuery.rows[0];
            console.log("Template search successful:", template.id); // Assuming you want to work with the first result
            const questionsQuery = await pool.query(
                'SELECT q.* FROM survey_template_questions stq ' +
                'JOIN questions q ON stq.question_id = q.id ' +
                'WHERE stq.survey_template_id = $1',
                [template.id]
            );

            // Create a response object including the template ID and the questions
            const response = {
                templateId: template.id, // Include the ID of the template
                templateName: template.name, // Include the name of the template
                questions: questionsQuery.rows // Include the associated questions
            };

            console.log("Found questions for template:", questionsQuery.rows);
            res.json(response); // Send the response object to the client
        } else {
            console.log("Survey template not found");
            res.status(404).send('Survey template not found');
        }
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal Server Error' }); // Send error as JSON
    }
});






// Endpoint for creating a survey
app.post("/api/surveys", async (req, res) => {
    const { survey_template_id, surveyor_id, organization_id, project_id, surveyor_role_id } = req.body;

    try {
        // Find the maximum ID from the surveys table
        const maxIdResult = await pool.query('SELECT MAX(id) FROM surveys');
        const maxId = maxIdResult.rows[0].max || 0;
        const newId = maxId + 1;

        // Insert the survey into the database with the new ID
        await pool.query(
            "INSERT INTO surveys (id, survey_template_id, surveyor_id, organization_id, project_id, surveyor_role_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())",
            [newId, survey_template_id, surveyor_id, organization_id, project_id, surveyor_role_id]
        );

        res.status(201).json({ message: 'Survey created successfully', id: newId });
    } catch (error) {
        console.error('Error creating survey:', error);
        res.status(500).json({ message: 'Failed to create survey' });
    }
});



// Get all Question Types
app.get("/api/question_types", async (req, res) => {
    try {
        // Query the database to get all question types
        const queryResult = await pool.query('SELECT * FROM question_types');

        // Send the query result as JSON response
        res.json(queryResult.rows);
    } catch (error) {
        console.error('Error fetching question types:', error);
        res.status(500).json({ message: 'Failed to fetch question types' });
    }
});

// Get all Organizations
app.get("/api/organizations", async (req, res) => {
    try {
        // Query the database to get all organizations
        const queryResult = await pool.query('SELECT * FROM organizations');

        // Send the query result as JSON response
        res.json(queryResult.rows);
    } catch (error) {
        console.error('Error fetching organizations:', error);
        res.status(500).json({ message: 'Failed to fetch organizations' });
    }
});

// Get all Projects
app.get("/api/projects", async (req, res) => {
    try {
        // Query the database to get all projects
        const queryResult = await pool.query('SELECT * FROM projects');

        // Send the query result as JSON response
        res.json(queryResult.rows);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
});



//3/25/24 Made a permission api to create the perismission for role
// Express route for creating a new permission
// POST endpoint for creating a new role
app.post('/api/permissions', requireAuth, async (req, res) => {
    try {
        // Retrieve user_id from the session
        const { user_id } = req.user;

        // Extract role name from request body
        const { name } = req.body;

        // Insert the new role into the database along with the createdBy user_id
        await pool.query('INSERT INTO roles (name, created_by) VALUES ($1, $2)', [name, user_id]);

        // Send success response
        res.status(201).json({ message: 'Role created successfully' });
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ message: 'Failed to create role' });
    }
});




// Example middleware to check authentication
function requireAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}



app.listen(5000, () => {
    console.log("Server started on port 5000");
});

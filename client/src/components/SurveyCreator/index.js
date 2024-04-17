import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add'; // For adding multiple choice options
import DeleteIcon from '@mui/icons-material/Delete';
import CSSidebar from '../CSSidebar';
import ConfirmationModal from '../ConfirmationModal';
import { SurveyContainer, QuestionContainer } from './styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../../scenes/utils/AuthContext';
import { makeStyles } from '@material-ui/core/styles';

const questionTypeToId = {
    'True or False': 1,
    'Likert Scale': 2,
    'Multiple Choice': 3
};

const useStyles = makeStyles(theme => ({
    dialogCustomWidth: {
        height: '20%', // Adjust width as necessary
        width: '30%',
        maxWidth: 'none', // Removes the max-width restriction to allow the dialog to grow
    },
}));




export const SurveyCreatorComponent = ({ setSuccessMessage, setErrorMessage }) => {
    const classes = useStyles();
    const [organizationId, setOrganizationId] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // State for the organization object or just the organization name
    const [organization, setOrganization] = useState('');
    const [templateId, setTemplateId] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [templates, setTemplates] = useState([
        { searchQuery: '' }, // Make sure all templates at least have a searchQuery property
    ]);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [pendingQuestions, setPendingQuestions] = useState([]);

    // const [templateName, setTemplateName] = useState('');
    // const [templateDescription, setTemplateDescription] = useState('');
    const [dialogState, setDialogState] = useState({
        templateId: 0,
        surveyorId: null,
        organizationId: null,
        projectId: null,
        created_at: null,
        created_by: 0,
        updated_at: null,
        updated_by: 0,
        deleted_at: null,
        deleted_by: 0,
    });
    const { user } = useAuth();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchData, setSearchData] = useState([]);
    //for creating survey off of survey import
    const [surveyData, setSurveyData] = useState({
    
  surveyTemplateId: null,
  questions: []
});
    //important for all survey creations


    const resetDialogForm = () => {
        setDialogState({
            templateId: 0,         // Reset templateId to 0
            surveyorId: null,      // Reset surveyorId to null
            organizationId: null,  // Reset organizationId to null
            projectId: null,
            surveyor_role_id: null,       // Reset projectId to null
            created_at: null,      // Reset creation timestamp
            created_by: 0,         // Reset created_by to 0
            updated_at: null,      // Reset update timestamp
            updated_by: 0,         // Reset updated_by to 0
            deleted_at: null,      // Reset deleted_at to null
            deleted_by: 0          // Reset deleted_by to 0
        });
    };

    const handleSubmitSurvey = async () => {
        setIsDialogOpen(false);  // Close the dialog on submit

        try {
            // Ensure templateId is set to 0 if it's falsy (e.g., undefined, null)
            const safeTemplateId = templateId || 0;
            const surveyorId = user?.userId || null;  // Get the user ID, defaulting to 0 if not found
            const organizationId = dialogState?.organizationId || null;
            const projectId = dialogState?.projectId || null;
            const surveyorroleid = user?.roleId || null; 

            // Using placeholders for dates
            const now = new Date().toISOString();
            const start_at = null;  // Future implementation placeholder
            const end_at = null;    // Future implementation placeholder
            const isActive = true;  // Assuming this should be set to true by default

            // Log all relevant data to console for debugging
            console.log('Sending the following data to backend:');
            console.log('Template ID:', safeTemplateId);
            console.log('Surveyor ID:', surveyorId);
            console.log('Organization ID:', organizationId);
            console.log('Project ID:', projectId);
            console.log('Start At:', start_at);
            console.log('End At:', end_at);
            console.log('Is Active:', isActive);

            // Sending the data to backend
            const linkResponse = await fetch('/api/create_survey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    survey_template_id: safeTemplateId,
                    surveyor_id: surveyorId,
                    organization_id: organizationId,
                    project_id: projectId,
                    surveyor_role_id: surveyorroleid,  
                    created_at: now,
                    created_by: surveyorId,
                    updated_at: now,
                    updated_by: surveyorId,
                    deleted_at: null,
                    deleted_by: null,
                    start_at,
                    end_at,
                    isActive
                }),
            });

            // Check the response status
            if (linkResponse.status === 201) {
                console.log('Survey creation successful');
                const result = await linkResponse.json(); // Parse JSON response
                setSuccessMessage('Survey created successfully!');
                console.log('Server response:', result);
            } else {
                const errorMsg = await linkResponse.text();
                throw new Error(`Failed to create survey: ${errorMsg}`);
            }

            // Reset form/dialog state after successful submission
            resetDialogForm(); // Resets all related state managed in the dialog

        } catch (error) {
            console.error("Error:", error);
            setErrorMessage(`Error creating survey: ${error.message}`);
        }
    };








    const getDefaultOptions = (type) => {
        const options = {
            'True or False': ['True', 'False'],
            'Likert Scale': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            'Multiple Choice': ['', '', ''] // Start with 3 empty options
        };

        return options[type] || []; // Return the options for the type, or an empty array if not found
    };

    const addQuestion = (type) => {
        setQuestions([
            ...questions,
            { questionText: '', options: getDefaultOptions(type), type: type }
        ]);
    };


    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].questionText = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(newQuestions);
    };

    const handleAddOption = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.push('');
        setQuestions(newQuestions);
    };

    const handleRemoveQuestion = (indexToRemove) => {
        setQuestions(questions.filter((_, index) => index !== indexToRemove));
    };

    const handleSearchQueryChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].searchQuery = value;
        setQuestions(newQuestions);
    };

    const handleSubmitSearch = async (index) => {
        const query = questions[index].searchQuery;
        try {
            const response = await fetch(`/api/search_questions?text=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Search failed: ${errorData.message}`);
            }
            const data = await response.json();
            if (data.length > 0) {
                console.log("Search successful:", data);
                handleAddQuestionFromSearch(data[0], index);  // Add the question from search and pass index to remove
            } else {
                console.log("No questions found matching the search criteria.");
            }
        } catch (error) {
            console.error("Search Error:", error.message);
            setErrorMessage(`Search error: ${error.message}`);
        }
    };



    

    const openSubmitDialog = () => {
        setIsDialogOpen(true);
    };



    


    const handleAddQuestionFromSearch = (searchResult, indexToRemove) => {
        const { question_type_id, question } = searchResult;
        const type = Object.keys(questionTypeToId).find(key => questionTypeToId[key] === question_type_id);

        if (type) {
            const newQuestions = questions.filter((_, index) => index !== indexToRemove);
            const newQuestion = {
                questionText: question, // Set the question text from the search result
                type: type,
                options: getDefaultOptions(type) // Now using the defined function
            };
            newQuestions.push(newQuestion);
            setQuestions(newQuestions);
        }
    };


    //import survey template

    const handleImportQuestionsFromTemplate = (templateQuestions) => {
        const importedQuestions = templateQuestions.map(q => {
            const typeKey = Object.keys(questionTypeToId).find(key => questionTypeToId[key] === q.question_type_id);
            if (!typeKey) {
                console.error("Invalid question type ID:", q.question_type_id);
                return null;
            }
            return {
                questionText: q.question,  // Set the question text from the search result
                options: getDefaultOptions(typeKey),  // Get default options based on the type
                type: typeKey  // Set the type using the reverse lookup from ID to type string
            };
        }).filter(q => q !== null);  // Filter out any undefined entries due to invalid type IDs

        setQuestions(importedQuestions);  // Set the imported questions into state
    };

    const handleSubmitTemplateImport = async (index) => {
        const query = questions[index].searchQuery;
        try {
            const response = await fetch(`/api/search_templates?text=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                // Check if the response is in JSON format
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    const errorData = await response.json();
                    throw new Error(`Template search failed: ${errorData.message}`);
                } else {
                    // Handle non-JSON responses or assume it's plain text
                    const errorText = await response.text();
                    throw new Error(`Template search failed: ${errorText}`);
                }
            }
            const data = await response.json();
            if (data.templateId) { // Corrected from templates.length which was incorrect
                setTemplateId(data.templateId);
                setPendingQuestions(data.questions);
                setConfirmModalOpen(true);  // Open confirmation modal
            } else {
                console.log("No templates found matching the search criteria.");
                setErrorMessage("No templates found matching the search criteria.");
            }
        } catch (error) {
            console.error("Template Import Error:", error.message);
            setErrorMessage(`Template import error: ${error.message}`);
        }
    };

    const handleSearchOrganization = async (index) => {
        const query = questions[index].searchQuery;
        try {
            const response = await fetch(`/api/search_organizations?text=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Organization search failed: ${errorData.message}`);
            }
            const data = await response.json();
            if (data.length > 0 && data[0].id) {
                console.log("Organization search successful:", data[0].id);
                setOrganizationId(data[0].id);  // Set the organization ID
                handleRemoveQuestion(index);  // Remove the search box
                setShowSuccessMessage(true);  // Set the flag to show the success message
            } else {
                console.log("No organizations found matching the search criteria.");
                setErrorMessage("No organizations found matching the search criteria.");
            }
        } catch (error) {
            console.error("Organization Search Error:", error.message);
            setErrorMessage(`Organization search error: ${error.message}`);
        }
    };


    const handleSearchProject = async (index) => {
        const query = questions[index].searchQuery;
        try {
            const response = await fetch(`/api/search_projects?text=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    const errorData = await response.json();
                    throw new Error(`Project search failed: ${errorData.message}`);
                } else {
                    const errorText = await response.text();
                    throw new Error(`Project search failed: ${errorText}`);
                }
            }
            const data = await response.json();
            if (data.length > 0 && data[0].id) {
                console.log("Project search successful:", data[0].id);
                setProjectId(data[0].id); // Assuming you have a state hook to store project ID
                handleRemoveQuestion(index); // Remove the search box similar to the organization search
                setShowSuccessMessage(true); // Display a success message
                setTimeout(() => {
                    setShowSuccessMessage(false); // Hide the success message after 3 seconds
                }, 3000);
            } else {
                console.log("No projects found matching the search criteria.");
                setErrorMessage("No projects found matching the search criteria.");
            }
        } catch (error) {
            console.error("Project Search Error:", error.message);
            setErrorMessage(`Project search error: ${error.message}`);
        }
    };








    



    const renderQuestionInput = (q, index) => {
        switch (q.type) {
            case 'True or False':
            case 'Likert Scale':
            case 'Multiple Choice':
                return (
                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">{`Question ${index + 1}`}</FormLabel>
                        <TextField
                            fullWidth
                            label="Question"
                            variant="outlined"
                            value={q.questionText}
                            onChange={(e) => handleQuestionChange(index, e.target.value)}
                        />
                        {q.type !== 'Multiple Choice' && (
                            <RadioGroup row>
                                {q.options.map((option, optionIndex) => (
                                    <FormControlLabel key={optionIndex} value={option} control={<Radio />} label={option} />
                                ))}
                            </RadioGroup>
                        )}
                        {q.type === 'Multiple Choice' && (
                            <>
                                {q.options.map((option, optionIndex) => (
                                    <div key={optionIndex}>
                                        <TextField
                                            fullWidth
                                            label={`Option ${optionIndex + 1}`}
                                            variant="outlined"
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                        />
                                        <IconButton onClick={() => handleAddOption(index)} aria-label="add">
                                            <AddIcon />
                                        </IconButton>
                                    </div>
                                ))}
                            </>
                        )}
                        <IconButton onClick={() => handleRemoveQuestion(index)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </FormControl>
                );
            case 'Add Existing Question':
                return (
                    <FormControl fullWidth>
                        <FormLabel>{`Search Existing Question ${index + 1}`}</FormLabel>
                        <TextField
                            label="Search"
                            variant="outlined"
                            value={q.searchQuery}
                            onChange={(e) => handleSearchQueryChange(index, e.target.value)}
                        />
                        <Button onClick={() => handleSubmitSearch(index)}>Submit Search</Button>
                        <IconButton onClick={() => handleRemoveQuestion(index)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </FormControl>
                );
            case 'Import Survey Template':
                return (
                    <FormControl fullWidth>
                        <FormLabel>{`Import Survey Template ${index + 1}`}</FormLabel>
                        <TextField
                            label="Search"
                            variant="outlined"
                            value={q.searchQuery}
                            onChange={(e) => handleSearchQueryChange(index, e.target.value)}
                        />
                        <Button onClick={() => handleSubmitTemplateImport(index)}>Import Template</Button>
                        <IconButton onClick={() => handleRemoveQuestion(index)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </FormControl>
                );
            case 'Assign Organization':
                return (
                    <FormControl fullWidth>
                        <FormLabel>{`Assign Organization ${index + 1}`}</FormLabel>
                        <TextField
                            label="Assign Organization"
                            variant="outlined"
                            value={q.searchQuery}
                            onChange={(e) => handleSearchQueryChange(index, e.target.value)}
                        />
                        <Button onClick={() => handleSearchOrganization(index)}>Assign Project</Button>
                        <IconButton onClick={() => handleRemoveQuestion(index)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </FormControl>
                );
            case 'Assign Project':
                return (
                    <FormControl fullWidth>
                        <FormLabel>{`Assign Project ${index + 1}`}</FormLabel>
                        <TextField
                            label="Assign Project"
                            variant="outlined"
                            value={q.searchQuery}
                            onChange={(e) => handleSearchQueryChange(index, e.target.value)}
                        />
                        <Button onClick={() => handleSearchProject(index)}>Assign Project</Button>
                        <IconButton onClick={() => handleRemoveQuestion(index)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </FormControl>
                );

            default:
                return null;
        }
    };



    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <CSSidebar onAddQuestion={addQuestion} />
            <SurveyContainer>
                {questions.map((q, index) => (
                    <QuestionContainer key={index}>
                        {renderQuestionInput(q, index)}
                    </QuestionContainer>
                ))}
                {questions.length > 0 && (
                    <Button variant="contained" onClick={openSubmitDialog}>Submit Survey</Button>
                )}
            </SurveyContainer>
            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                classes={{ paper: classes.dialogCustomWidth }}  // Apply custom width
            >
                <DialogTitle>Submit Survey</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmitSurvey}>Submit</Button>
                </DialogActions>
            </Dialog>
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={() => {
                    handleImportQuestionsFromTemplate(pendingQuestions);
                    setConfirmModalOpen(false); // Optionally close modal after confirm
                }}
            />
        </div>
    );

};

export default SurveyCreatorComponent;
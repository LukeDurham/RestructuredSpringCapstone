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
    const [organization, setOrganization] = useState("");
    




//     const handleSubmitSurvey = async () => {
//     setIsDialogOpen(false);

//     // Step 1: Create Survey Template including organization information
//     try {
//         const templateResponse = await fetch('/api/CreatingSurveyTemplate/survey_templates', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name: templateName, // Assuming you keep this field
//                 description: templateDescription, // Assuming you keep this field
//                 created_by: user?.id || 0, // Default to 0 if user id is not available
//                 organization: organization || null, // Include organization info, or null if not specified
//             }),
//         });

//         if (templateResponse.status !== 201) {
//             const errorMsg = await templateResponse.text();
//             throw new Error(`Failed to create survey template: ${errorMsg}`);
//         }

//         const { id: surveyTemplateId } = await templateResponse.json();

//         // Step 2: Create Questions
//         const questionsResponse = await fetch('/api/CreatingSurveyTemplate/questions', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 questions: questions.map(question => ({
//                     question_type_id: questionTypeToId[question.type],
//                     question: question.questionText,
//                 })),
//             }),
//         });

//         if (questionsResponse.status !== 201) {
//             const errorMsg = await questionsResponse.text();
//             throw new Error(`Failed to create questions: ${errorMsg}`);
//         }

//         const { questionIds } = await questionsResponse.json();

//         // Step 3: Link Survey Template with Questions
//         const linkResponse = await fetch('/api/CreatingSurveyTemplate/survey_template_questions', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ surveyTemplateId, questionIds }),
//         });

//         if (linkResponse.status !== 201) {
//             const errorMsg = await linkResponse.text();
//             throw new Error(`Failed to link survey template and questions: ${errorMsg}`);
//         }

//         console.log('Survey template and questions successfully created and linked');
//         setSuccessMessage('Survey template and questions successfully created and linked');

//         // Reset form state after successful submission
//         setTemplateName('');
//         setTemplateDescription('');
//         setOrganization(''); // Reset the organization field
//         setQuestions([]);

//     } catch (error) {
//         console.error("Error:", error);
//         setErrorMessage(error.message);
//     }
// };

    const resetDialogForm = () => {
        setDialogState({
            templateId: 0,         // Reset templateId to 0
            surveyorId: null,      // Reset surveyorId to null
            organizationId: null,  // Reset organizationId to null
            projectId: null,       // Reset projectId to null
            created_at: null,      // Reset creation timestamp
            created_by: 0,         // Reset created_by to 0
            updated_at: null,      // Reset update timestamp
            updated_by: 0,         // Reset updated_by to 0
            deleted_at: null,      // Reset deleted_at to null
            deleted_by: 0          // Reset deleted_by to 0
        });
    };

    const handleSubmitSurvey = async () => {
        setIsDialogOpen(false);

        try {
            // Ensure templateId is set to 0 if it's falsy (undefined, null, etc.)
            const safeTemplateId = templateId || 0;

            // Proceed with further steps using safeTemplateId
            const surveyorId = user?.userId;  // Assuming 'user' is available from context or state

            const organizationId = dialogState?.organizationId || null;

            const projectId = null; // Placeholder for future implementation

            const now = new Date().toISOString();

            console.log(safeTemplateId);
            console.log(surveyorId);
            console.log(organizationId);
            console.log(projectId);

            // Example of a POST request using safeTemplateId
            // const linkResponse = await fetch('/api/LinkTemplateWithDetails', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         templateId: safeTemplateId,
            //         surveyorId,
            //         organizationId,
            //         projectId,
            //         created_at: now,
            //         created_by: 0, // Default to 0 as specified
            //         updated_at: now,
            //         updated_by: 0,
            //         deleted_at: null,
            //         deleted_by: 0
            //     }),
            // });

            // if (linkResponse.status !== 201) {
            //     const errorMsg = await linkResponse.text();
            //     throw new Error(`Failed to link survey template with details: ${errorMsg}`);
            // }

            // Success handling
            console.log('Template and details successfully linked');
            setSuccessMessage('Template and details successfully linked');

            // Reset form/dialog state after successful submission
            resetDialogForm(); // Assuming this function resets all state managed in the dialog

        } catch (error) {
            console.error("Error:", error);
            setErrorMessage(error.message);
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
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="organization"
                        label="Organization"
                        type="text"
                        fullWidth
                        variant="outlined"
                        placeholder="Leave blank if not for a specific organization"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                    />
                </DialogContent>
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
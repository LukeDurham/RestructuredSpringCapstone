// survey_json.js
export const surveyJSON = {
    title: "New Survey",
    pages: [
        {
            questions: [
                {
                    type: "radiogroup",
                    name: "true_false_question",
                    title: "Is this a sample question?",
                    choices: ["True", "False"]
                }
            ]
        }
    ]
};
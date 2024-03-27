export const json = {
    "title": "USACE DSMCE Survey Questions",
    "description": "The U.S. Army Corps of Engineers oversees approximately 740 dams across the country, serving various vital functions.",
    
    "focusFirstQuestionAutomatic": false,
    "completedHtmlOnCondition": [
     {
      "expression": "{nps-score} <= 6 or {rebuy} = false",
      "html": "Thanks for your feedback! We highly value all ideas and suggestions from our customers, whether they're positive or critical. In the future, our team might reach out to you to learn more about how we can further improve our product so that it exceeds your expectations."
     },
     {
      "expression": "{nps-score} = 6 or {nps-score} = 7",
      "html": "Thanks for your feedback. Our goal is to create the best possible product, and your thoughts, ideas, and suggestions play a major role in helping us identify opportunities to improve."
     },
     {
      "expression": "{nps-score} >= 8",
      "html": "Thanks for your feedback. It's great to hear that you're a fan of our work. Your feedback helps us discover new opportunities to improve it and make sure you have the best possible experience."
     }
    ],
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "panel",
        "name": "panel1",
        "elements": [
         {
          "type": "rating",
          "name": "nps-score",
          "title": "On a scale from 0 to 10, how likely are you to recommend us to a friend or colleague?",
          "defaultValue": 9,
          "rateMin": 0,
          "rateMax": 10
         },
         {
          "type": "comment",
          "name": "disappointing-experience",
          "visible": false,
          "visibleIf": "{nps-score} <= 5",
          "title": "How did we disappoint you and what can we do to make things right?",
          "maxLength": 300
         },
         {
          "type": "comment",
          "name": "improvements-required",
          "visibleIf": "{nps-score} >= 6",
          "title": "What can we do to make your experience more satisfying?",
          "maxLength": 300
         },
         {
          "type": "checkbox",
          "name": "promoter-features",
          "visibleIf": "{nps-score} >= 9",
          "title": "Which of the following features do you value the most?",
          "description": "Please select no more than three features.",
          "isRequired": true,
          "choices": [
           {
            "value": "performance",
            "text": "Performance"
           },
           {
            "value": "stability",
            "text": "Stability"
           },
           {
            "value": "ui",
            "text": "User interface"
           },
           {
            "value": "complete-functionality",
            "text": "Complete functionality"
           },
           {
            "value": "learning-materials",
            "text": "Learning materials (documentation, demos, code examples)"
           },
           {
            "value": "support",
            "text": "Quality support"
           }
          ],
          "showOtherItem": true,
          "otherPlaceholder": "Please specify...",
          "otherText": "Other features",
          "colCount": 2,
          "maxSelectedChoices": 3
         }
        ]
       }
      ]
     },
     {
      "name": "page2",
      "elements": [
       {
        "type": "boolean",
        "name": "rebuy",
        "title": "Would you buy our product again?"
       }
      ]
     },
     {
      "name": "page3",
      "elements": [
       {
        "type": "radiogroup",
        "name": "testimonial",
        "title": "Would you mind providing us a brief testimonial for the website?",
        "choices": [
         {
          "value": "yes",
          "text": "Sure!"
         },
         {
          "value": "no",
          "text": "No"
         }
        ]
       },
       {
        "type": "text",
        "name": "email",
        "visible": false,
        "visibleIf": "{testimonial} = 'yes'",
        "title": "What is your email address?",
        "validators": [
         {
          "type": "email"
         }
        ],
        "placeholder": "Enter your email here"
       }
      ]
     }
    ],
    "showPrevButton": false,
    "showQuestionNumbers": "off",
    "widthMode": "static",
    "width": "800"
   };
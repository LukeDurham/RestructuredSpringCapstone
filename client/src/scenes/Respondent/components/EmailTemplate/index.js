import React, { useState } from 'react';

// Mock data to simulate fetching users with the role "respondent"
const respondents = [
  { id: 1, name: 'Jane Doe', email: 'jane@example.com', role: 'respondent' },
  { id: 2, name: 'John Doe', email: 'john@example.com', role: 'respondent' },
  // Add more respondents as needed
];

function EmailForm() {
  const [selectedUser, setSelectedUser] = useState('');
  const [emailBody, setEmailBody] = useState('Hey, just wanted to kindly reach out to remind you that you will need to complete the survey by April 11, 2024.');

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleBodyChange = (event) => {
    setEmailBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would integrate your email sending logic
    //console.log(Sending email to ${selectedUser}: ${emailBody});
    // Reset form (optional)
    setSelectedUser('');
    setEmailBody('Hey, just wanted to kindly reach out to remind you that you will need to complete the survey by April 11, 2024.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Select User:
          <select value={selectedUser} onChange={handleUserChange}>
            <option value="">Select a respondent</option>
            {respondents.map((user) => (
              <option key={user.id} value={user.email}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Email Body:
          <textarea value={emailBody} onChange={handleBodyChange} rows="4" />
        </label>
      </div>
      <button type="submit">Send Email</button>
    </form>
  );
}

export default EmailForm;
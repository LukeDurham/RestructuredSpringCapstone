import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Styles
const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '500px',
        margin: 'auto'
    },
    select: {
        height: '150px',
        marginBottom: '10px'
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px'
    },
    textarea: {
        height: '100px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '10px'
    },
    button: {
        padding: '10px 20px',
        background: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
    },
    buttonHover: {
        background: '#0056b3'
    }
};

const EmailSender = () => {
    const [organizations, setOrganizations] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [emailBody, setEmailBody] = useState('Hello,\n\nPlease find the attached document related to our upcoming project. Let us know if you have any questions.\n\nBest regards,\n[Your Name/Company]');
    const [emailSubject, setEmailSubject] = useState('Information Regarding Upcoming Project');

    // Fetch organizations/projects
    useEffect(() => {
        axios.get('/api/organizations').then(response => {
            setOrganizations(response.data);
        });
    }, []);

    // Fetch users when organization/project changes
    useEffect(() => {
        if (selectedOrg) {
            axios.get(`/api/users/${selectedOrg}`).then(response => {
                setUsers(response.data);
            });
        }
    }, [selectedOrg]);

    const handleOrgChange = (event) => {
        setSelectedOrg(event.target.value);
    };

    const handleUserSelection = (event) => {
        const value = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        setSelectedUsers(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            users: selectedUsers,
            subject: emailSubject,
            body: emailBody,
        };
        axios.post('/api/send-email', data).then(response => {
            alert('Email sent successfully!');
        }).catch(error => {
            console.error('Error sending email:', error);
            alert('Failed to send email.');
        });
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <select onChange={handleOrgChange} value={selectedOrg} style={styles.select} multiple>
                    {organizations.map(org => (
                        <option key={org.id} value={org.id}>{org.name}</option>
                    ))}
                </select>
                <select onChange={handleUserSelection} style={styles.select} multiple size="10">
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.email}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Email Subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    style={styles.input}
                />
                <textarea
                    placeholder="Write your email here..."
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    style={styles.textarea}
                />
                <button type="submit" style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.background = styles.buttonHover.background}
                    onMouseOut={(e) => e.currentTarget.style.background = styles.button.background}>
                    Send Email
                </button>
            </form>
        </div>
    );
}

export default EmailSender;

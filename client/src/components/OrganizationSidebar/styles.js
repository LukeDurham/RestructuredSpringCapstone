// styles.js
import styled from 'styled-components';

export const SidebarContainer = styled.div`
    width: 250px; /* Adjust width as needed */
    height: 100vh; /* Full height */
    position: fixed; /* Fixed sidebar (stay in place on scroll) */
    left: 0;
    top: 0;
    padding: 60px 20px 20px 20px; /* Increase top padding to push content down */
    background-color: #f4f4f4; /* Light grey background */
`;

export const SidebarItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px; /* Space between icon and text */
    padding: 10px;
    text-decoration: none;
    font-size: 16px;
    color: black; /* Text color */
    transition: background-color 0.2s;

    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;

    &:hover {
        background-color: #ddd; /* Light grey background on hover */
    }
    

`;



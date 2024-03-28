import styled from "styled-components";

export const DeleteBtn = styled.button`
  background-color: transparent; // Transparent background
  border: none; // No border
  cursor: pointer; // Change cursor on hover
  color: red; // Red color for the icon

  &:hover,
  &:focus {
    color: darkred; // Darken the red on hover/focus
  }
`;
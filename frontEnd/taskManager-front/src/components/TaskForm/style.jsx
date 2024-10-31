import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: #4CAF50; /* Verde */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        background-color: #45a049; /* Verde mais escuro */
    }
`;

export default StyledButton;

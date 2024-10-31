import styled from 'styled-components';

export const FormContainer = styled.div`
    align-items: center;
    border: 3px, solid, #4CAF50;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    justify-content: space-around;
    margin: 1rem;
    padding: 1rem;
    
    @media (min-width: 700px) {
        display: flex;
        flex-direction: row;
        
        text-align: center;
    }
    `

export const StyledInput = styled.input`
    padding: .5rem 1rem;
    width: 80%;
    
    @media (min-width: 700px) {
        margin: 1rem auto;
        text-align: center;
        width: 20%;
    }
    `

    export const StyledButton = styled.button`
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: .5rem 1rem;
        text-align: center;
        text-decoration: none;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 4px;
        width: 94%;
    
        &:hover {
            background-color: #45a049;
        }

        @media (min-width: 700px) {
        width: 20%;
    }
    `

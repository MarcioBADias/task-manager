import styled from 'styled-components'

export const ListContainer = styled.div`
  background-color: #4caf50;
  height: 100vh;
  margin-top: 1rem;
  padding: 1rem;
`
export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
export const ItenList = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  margin-top: 0.5rem;

  svg {
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  svg:hover {
    transform: scale(1.1);
  }
`

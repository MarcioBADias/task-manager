import React, { useState } from 'react'
import * as S from './style'

const TaskForm = ({ onTaskAdded }) => {
  const [name, setName] = useState('')
  const [cost, setCost] = useState('')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newTask = { name, cost, dueDate }

    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })

    const addedTask = await response.json()
    onTaskAdded(addedTask)

    setName('')
    setCost('')
    setDueDate('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <S.FormContainer>
        <S.StyledInput
          type="text"
          placeholder="Nome da Tarefa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <S.StyledInput
          type="number"
          placeholder="Custo (R$)"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
        />
        <S.StyledInput
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </S.FormContainer>
      <S.StyledButton type="submit">Adicionar Tarefa</S.StyledButton>
    </form>
  )
}

export default TaskForm

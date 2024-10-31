import React from 'react'
import {
  RiEditBoxFill,
  RiDeleteBack2Fill,
  RiArrowUpCircleFill,
  RiArrowDownCircleFill,
} from 'react-icons/ri'
import * as S from './style'

const TaskList = ({ tasks, setTasks }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR')
  }

  const handleDelete = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'DELETE',
      })
      setTasks(tasks.filter((task) => task._id !== taskId)) // Atualiza a lista sem o item deletado
    } catch (error) {
      console.error('Erro ao deletar a tarefa:', error)
    }
  }

  return (
    <S.ListContainer>
      <h2>Lista de Tarefas</h2>
      <S.List>
        {tasks.map((task) => (
          <S.ItenList key={task._id} highlight={task.cost > 900}>
            <RiEditBoxFill />
            {task.name} - R$ {task.cost} - {formatDate(task.dueDate)}
            <RiDeleteBack2Fill onClick={() => handleDelete(task._id)} />
            <RiArrowUpCircleFill />
            <RiArrowDownCircleFill />
          </S.ItenList>
        ))}
      </S.List>
    </S.ListContainer>
  )
}

export { TaskList }

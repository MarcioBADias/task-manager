import React, { useState } from 'react'
import {
  RiEditBoxFill,
  RiDeleteBack2Fill,
  RiArrowUpCircleFill,
  RiArrowDownCircleFill,
  RiCheckboxCircleFill,
} from 'react-icons/ri'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import * as S from './style'

const TaskList = ({ tasks, setTasks }) => {
  const [editingTask, setEditingTask] = useState(null)
  const [editedName, setEditedName] = useState('')
  const [editedCost, setEditedCost] = useState('')
  const [editedDueDate, setEditedDueDate] = useState('')

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR')
  }

  const handleDelete = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'DELETE',
      })
      setTasks(tasks.filter((task) => task._id !== taskId))
    } catch (error) {
      console.error('Erro ao deletar a tarefa:', error)
    }
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setEditedName(task.name)
    setEditedCost(task.cost)
    setEditedDueDate(task.dueDate)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const updatedTask = {
      ...editingTask,
      name: editedName,
      cost: Number(editedCost),
      dueDate: editedDueDate,
    }

    try {
      const response = await fetch(
        `http://localhost:5000/tasks/${editingTask._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
        },
      )

      if (response.ok) {
        const taskData = await response.json()
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskData._id ? taskData : task,
          ),
        )
        setEditingTask(null)
      } else {
        console.error('Erro ao atualizar a tarefa')
      }
    } catch (error) {
      console.error('Erro ao atualizar a tarefa:', error)
    }
  }

  const handleMoveUp = (index) => {
    if (index === 0) return
    const newTasks = [...tasks]
    ;[newTasks[index - 1], newTasks[index]] = [
      newTasks[index],
      newTasks[index - 1],
    ]
    setTasks(newTasks)
  }

  const handleMoveDown = (index) => {
    if (index === tasks.length - 1) return
    const newTasks = [...tasks]
    ;[newTasks[index], newTasks[index + 1]] = [
      newTasks[index + 1],
      newTasks[index],
    ]
    setTasks(newTasks)
  }

  const handleDragEnd = async (result) => {
    if (!result.destination) return

    const reorderedTasks = Array.from(tasks)
    const [removed] = reorderedTasks.splice(result.source.index, 1)
    reorderedTasks.splice(result.destination.index, 0, removed)

    setTasks(reorderedTasks)

    await fetch('http://localhost:5000/tasks/reorder', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tasks: reorderedTasks }),
    })
  }

  return (
    <S.ListContainer>
      <h2>Lista de Tarefas</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <S.List {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <S.ItenList
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      highlight={task.cost > 900}
                    >
                      {editingTask && editingTask._id === task._id ? (
                        <form onSubmit={handleUpdate}>
                          <S.EditContainer>
                            <S.ListInput
                              type="text"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                              required
                            />
                            <S.ListInput
                              type="number"
                              value={editedCost}
                              onChange={(e) => setEditedCost(e.target.value)}
                              required
                            />
                            <S.ListInput
                              type="date"
                              value={editedDueDate}
                              onChange={(e) => setEditedDueDate(e.target.value)}
                              required
                            />
                            <button
                              type="submit"
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                              }}
                            >
                              <RiCheckboxCircleFill />
                            </button>
                          </S.EditContainer>
                        </form>
                      ) : (
                        <>
                          <RiEditBoxFill onClick={() => handleEdit(task)} />
                          {task.name} - R$ {task.cost} -{' '}
                          {formatDate(task.dueDate)}
                          <RiDeleteBack2Fill
                            onClick={() => handleDelete(task._id)}
                          />
                          <RiArrowUpCircleFill
                            onClick={() => handleMoveUp(index)}
                          />
                          <RiArrowDownCircleFill
                            onClick={() => handleMoveDown(index)}
                          />
                        </>
                      )}
                    </S.ItenList>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </S.List>
          )}
        </Droppable>
      </DragDropContext>
    </S.ListContainer>
  )
}

export { TaskList }

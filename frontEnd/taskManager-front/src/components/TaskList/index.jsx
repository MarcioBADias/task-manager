import React, { useEffect, useState } from 'react';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('http://localhost:5000/tasks');
            const data = await response.json();
            setTasks(data);
        };

        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
        setTasks(tasks.filter(task => task._id !== id));
    };

    return (
        <div>
            <h2>Lista de Tarefas</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <span>{task.name} - R$ {task.cost}</span>
                        <button onClick={() => handleDelete(task._id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;

import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
    const [tasks, setTasks] = useState([]);

    const handleTaskAdded = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    return (
        <div>
            <h1>Gerenciador de Tarefas</h1>
            <TaskForm onTaskAdded={handleTaskAdded} />
            <TaskList tasks={tasks} />
        </div>
    );
};

export default App;

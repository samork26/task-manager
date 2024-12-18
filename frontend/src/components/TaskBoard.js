import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getTasks, updateTask } from '../services/api';
import '../styles/TaskBoard.css';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null); // State for error messages
  const statuses = ["To Do", "In Progress", "Done"];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response); // Assume `response` already contains `data`
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error fetching tasks:', err.message || err);
      setError('Failed to load tasks. Please try again later.');
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    try {
      const updatedTasks = tasks.map((task) =>
        task.id === parseInt(draggableId) ? { ...task, status: destination.droppableId } : task
      );

      setTasks(updatedTasks); // Optimistically update UI
      await updateTask(draggableId, { status: destination.droppableId });
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error updating task:', err.message || err);
      setError('Failed to update task status. Please try again.');
    }
  };

  return (
    <div>
      {error && <p className="error-message">{error}</p>} {/* Display errors */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-board-container">
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className="task-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{status}</h2>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            className="task-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;

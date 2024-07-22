import React, { useEffect, useState } from "react";
import axios from "axios";
import useStore from '../zustand/authStore';
import Card from "./Card";
import Modal from "./Modal";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Board = () => {
  const { token, user } = useStore();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [editState, setEditState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user && token) {
        setLoading(true);
        try {
          const response = await axios.get(`https://voosh-assignment-server.onrender.com/api/task/tasks/${user.user._id}`, {
            headers: { Authorization: `Bearer ${token.token}` }
          });
          setTasks(response.data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!task.trim()) return;

    try {
      const response = await axios.post('https://voosh-assignment-server.onrender.com/api/task/', {
        taskNumber: tasks.length + 1,
        userId: user.user._id,
        description: task,
      }, {
        headers: { Authorization: `Bearer ${token.token}` }
      });

      if (response.status === 201) {
        setTasks([...response.data]);
        setTask("");
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const updateTask = async () => {
    if (!task.trim()) return;

    try {
      const response = await axios.put('https://voosh-assignment-server.onrender.com/api/task/update-task/', {
        userId: user.user._id,
        description: task,
        taskId: taskId
      }, {
        headers: { Authorization: `Bearer ${token.token}` }
      });

      if (response.status === 200) {
        setTasks([...response.data]);
        setTask("");
        setEditState(false);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  const deleteTask = async (id) => {
    try {
      const userId = user.user._id;
      const response = await axios.delete(`https://voosh-assignment-server.onrender.com/api/task/delete/${id}/${userId}`, {
        headers: { Authorization: `Bearer ${token.token}` }
      });
      setTasks([...response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (e) => setTask(e.target.value);

  const todoTasks = tasks.filter((todo) => todo.status === "To-do");
  const inProgressTasks = tasks.filter((inProgress) => inProgress.status === "In-Progress");
  const doneTasks = tasks.filter((done) => done.status === "Done");
  const approvedTasks = tasks.filter((approved) => approved.status === "Approved");

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      const newTasks = Array.from(tasks);
      const [movedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, movedTask);
      setTasks(newTasks);
    } else {
      const movedTask = tasks.find(task => task._id === draggableId);

      if (movedTask) {
        try {
          await axios.put('https://voosh-assignment-server.onrender.com/api/task/update-status', {
            taskId: movedTask._id,
            status: destination.droppableId,
          }, {
            headers: { Authorization: `Bearer ${token.token}` }
          });

          const updatedTasks = tasks.map(task =>
            task._id === movedTask._id ? { ...task, status: destination.droppableId } : task
          );
          setTasks(updatedTasks);
        } catch (error) {
          console.error('Error updating task status:', error);
        }
      }
    }
  }

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="text-gray-600 body-font">
        <div className="container px-5 pb-4 mx-auto">
          <div className="flex align-middle justify-center">
            <div>
              <section className="text-gray-600 body-font">
                <div className="container px-5 py-2">
                  <div className="flex lg:w-3/3 w-full sm:flex-row flex-col px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                    <div className="relative flex-grow w-full">
                      <label htmlFor="task" className="leading-7 text-sm text-gray-600">Add Task</label>
                      <input
                        onChange={handleInputChange}
                        value={task}
                        type="text"
                        id="task"
                        name="task"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>

                    {editState ?
                      <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={updateTask}>Edit</button>
                      :
                      <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={addTask}>Add</button>
                    }
                  </div>
                </div>
              </section>
            </div>
          </div>
          {loading ? <p>Loading...</p> : (
            <div className="flex flex-wrap -m-4">
              <Droppable droppableId="To-do">
                {(provided) => (
                  <div className="xl:w-1/4 md:w-1/2 p-4" ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <p className="text-white text-lg font-bold p-4 bg-blue-500 mb-2">To-Do</p>
                      {todoTasks.map((todo, index) => (
                        <Card
                          key={todo._id}
                          todo={todo}
                          id={todo._id}
                          index={index}
                          setTask={setTask}
                          setEditState={setEditState}
                          setTaskId={setTaskId}
                          deleteTask={deleteTask}
                          openModal={openModal}
                        />
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="In-Progress">
                {(provided) => (
                  <div className="xl:w-1/4 md:w-1/2 p-4" ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <p className="text-white text-lg font-bold p-4 bg-blue-500 mb-2">In-Progress</p>
                      {inProgressTasks.map((inprogress, index) => (
                        <Card
                          key={inprogress._id}
                          id={inprogress._id}
                          todo={inprogress}
                          index={index}
                          setTask={setTask}
                          setEditState={setEditState}
                          setTaskId={setTaskId}
                          deleteTask={deleteTask}
                          openModal={openModal}
                        />
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="Done">
                {(provided) => (
                  <div className="xl:w-1/4 md:w-1/2 p-4" ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <p className="text-white text-lg font-bold p-4 bg-blue-500 mb-2">Done</p>
                      {doneTasks.map((done, index) => (
                        <Card
                          key={done._id}
                          id={done._id}
                          todo={done}
                          index={index}
                          setTask={setTask}
                          setEditState={setEditState}
                          setTaskId={setTaskId}
                          deleteTask={deleteTask}
                          openModal={openModal}
                        />
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="Approved">
                {(provided) => (
                  <div className="xl:w-1/4 md:w-1/2 p-4" ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <p className="text-white text-lg font-bold p-4 bg-blue-500 mb-2">Approved</p>
                      {approvedTasks.map((approved, index) => (
                        <Card
                          key={approved._id}
                          id={approved._id}
                          todo={approved}
                          index={index}
                          setTask={setTask}
                          setEditState={setEditState}
                          setTaskId={setTaskId}
                          deleteTask={deleteTask}
                          openModal={openModal}
                        />
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )}
          {/* Render the Modal */}
          {isModalOpen && <Modal task={selectedTask} closeModal={closeModal} />}
        </div>
      </section>
    </DragDropContext>
  );
};

export default Board;

import { format } from 'date-fns';
import { Draggable } from 'react-beautiful-dnd'

const Card = ({ todo, index, id, setTask, setEditState, setTaskId, deleteTask, openModal }) => {
    return (
        <Draggable draggableId={id.toString()} index={index}>
            {(provided) => (
                <div className="p-4 bg-blue-100 mb-2" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold">Task {todo.taskNumber}</h3>
                        <p>Description: {todo.description}</p>
                        <p className="text-sm text-muted-foreground">Created at: {format(todo.createdAt, 'dd/MM/yyyy, HH:mm:ss')}</p>
                    </div>
                    <div className="flex space-x-2 mt-4">
                        <button onClick={() => deleteTask(todo._id)} className="bg-red-500 text-sm text-white hover:bg-red-600 focus:ring-red-500 focus:ring-offset-2 focus:ring-2 rounded-md px-4 py-2">
                            Delete
                        </button>
                        <button onClick={() => {
                            setEditState(true);
                            setTask(todo.description);
                            setTaskId(todo._id);
                        }} className="bg-blue-500 text-sm text-white hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 rounded-md px-4 py-2">
                            Edit
                        </button>
                        <button onClick={() => openModal(todo)} className="bg-blue-700 text-sm text-white hover:bg-blue-800 focus:ring-blue-700 focus:ring-offset-2 focus:ring-2 rounded-md px-4 py-2">
                            View Details
                        </button>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default Card;

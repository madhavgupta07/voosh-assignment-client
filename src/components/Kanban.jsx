import Nav from './Nav'
import Board from './Board'
import { DragDropContext } from 'react-beautiful-dnd'

const Kanban = () => {
   
    return (
        <div>
            <Nav />
            <DragDropContext onDragEnd={() => {}}>
                <Board />
            </DragDropContext>
        </div>
    )
}

export default Kanban
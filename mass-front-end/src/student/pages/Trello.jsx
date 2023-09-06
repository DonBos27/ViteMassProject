import React, { useState } from 'react'
import NavbarStudent from '../global/NavbarStudent';
import Sidebar from '../global/Sidebar'
import EventNoteIcon from '@mui/icons-material/EventNote';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
function Trello({handleProfile}) {
    const[list, setLists] = useState();
  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full mr-4 mb-4 mt-4 h-screen">
        <NavbarStudent Icon={EventNoteIcon} title={"Trello"} handleProfile={handleProfile} />
        <div className="">
          <DragDropContext>
            {/* <div className="flex justify-center">
                <div className="w-1/4">
                    <h2 className="text-3xl font-bold mb-5">To Do</h2>
                    <div className="bg-gray-200 p-2 rounded-lg">
                        <Draggable draggableId="draggable-1" index={0}>
                            {(provided) => (
                                <div
                                className="bg-white p-2 rounded-lg mb-2"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                >
                                <p className="text-gray-800">Task 1</p>
                                </div>
                            )}
                        </Draggable>
                        <Draggable draggableId="draggable-2" index={1}>
                            {(provided) => (
                                <div
                                className="bg-white p-2 rounded-lg mb-2"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                >
                                <p className="text-gray-800">Task 2</p>
                                </div>
                            )}
                        </Draggable>
                    </div>
                </div>
                <div className="w-1/4">
                    <h2 className="text-3xl font-bold mb-5">In Progress</h2>
                    <div className="bg-gray-200 p-2 rounded-lg">
                        <Draggable draggableId="draggable-3" index={2}>
                            {(provided) => (
                                <div
                                className="bg-white p-2 rounded-lg mb-2"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                >
                                <p className="text-gray-800">Task 3</p>
                                </div>
                            )}
                        </Draggable>
                    </div>
                </div>
                <div className="w-1/4">
                    <h2 className="text-3xl font-bold mb-5">Done</h2>
                    <div className="bg-gray-200 p-2 rounded-lg">
                        <Draggable draggableId="draggable-4" index={3}>
                            {(provided) => (
                                <div
                                className="bg-white p-2 rounded-lg mb-2"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                >
                                <p className="text-gray-800">Task 4</p>
                                </div>
                            )}
                        </Draggable>
                    </div>
                </div>
            </div> */}
            <Droppable droppableId='app' type='list' direction='list'>
                {(provided) => (
                    <div className="flex justify-center" {...provided.droppableProps} ref={provided.innerRef}>
                        <div className="w-1/4">
                            <h2 className="text-3xl font-bold mb-5">To Do</h2>
                            <div className="bg-gray-200 p-2 rounded-lg">
                                <Draggable draggableId="draggable-1" index={0}>
                                    {(provided) => (
                                        <div
                                        className="bg-white p-2 rounded-lg mb-2"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        >
                                        <p className="text-gray-800">Task 1</p>
                                        </div>
                                    )}
                                </Draggable>
                                <Draggable draggableId="draggable-2" index={1}>
                                    {(provided) => (
                                        <div
                                        className="bg-white p-2 rounded-lg mb-2"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        >
                                        <p className="text-gray-800">Task 2</p>
                                        </div>
                                    )}
                                </Draggable>
                            </div>
                        </div>
                        <div className="w-1/4">
                            <h2 className="text-3xl font-bold mb-5">In Progress</h2>
                            <div className="bg-gray-200 p-2 rounded-lg">
                                <Draggable draggableId="draggable-3" index={2}>
                                    {(provided) => (
                                        <div
                                        className="bg-white p-2 rounded-lg mb-2"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        >
                                        <p className="text-gray-800">Task 3</p>
                                        </div>
                                    )}
                                </Draggable>
                            </div>
                        </div>
                        <div className="w-1/4">
                            <h2 className="text-3xl font-bold mb-5">Done</h2>
                            <div className="bg-gray-200 p-2 rounded-lg">
                                <Draggable draggableId="draggable-4" index={3}>
                                    {(provided) => (
                                        <div
                                        className="bg-white p-2 rounded-lg mb-2"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        >
                                        <p className="text-gray-800">Task 4</p>
                                        </div>
                                    )}
                                </Draggable>
                            </div>
                        </div>
                    </div>
                )}
                
                

            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  )
}

export default Trello
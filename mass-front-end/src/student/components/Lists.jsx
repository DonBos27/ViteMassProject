import { list } from '@material-tailwind/react';
import React from 'react'
import {Droppable, Draggable } from 'react-beautiful-dnd';
import InputContainer from './InputContainer';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
function Lists({list, index}) {
    console.log(list.id);
  return (
    <>
        {/* <Draggable draggableId={list.id} key={index}>
           {
                (provided) => (
                    <div {...provided.draggableProps} ref={provided.innerRef}>
                        <div {...provided.dragHandleProps}>
                            <div>
                                {list.title}
                            </div>
                            <div>
                                <Droppable droppableId={list.id} type='tasks'>
                                    {
                                        (provided) => (
                                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                                {
                                                   list.cards.map((card,index) => (
                                                    <h1 key={index}>Cards</h1>
                                                   ))
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }
                                </Droppable>
                            </div>
                        </div>
                    </div>
                )
           }
        </Draggable> */}
        {/* <Draggable draggableId={list.id} key={index} className="flex flex-col justify-between border rounded p-2">
            <div className="flex justify-between">
                <h3 className="text-lg font-bold">{list.title}</h3>
                <button className="text-gray-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                </button>
            </div>
            <Droppable droppableId={list.id} type='tasks'>
                {
                    (provided) => (
                        <div className="mt-4" {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                list.cards.map((card,index) => (
                                    <div className="bg-white p-2 rounded-lg mb-2" key={index}>
                                        <p className="text-gray-800">{card.title}</p>
                                    </div>
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }

            </Droppable>
            

        </Draggable> */}
        <Draggable draggableId={list.id} key={index}>
            {
                (provided) => (
                    <div  {...provided.draggableProps} ref={provided.innerRef}>
                        <div className='list-cards' {...provided.dragHandleProps}>
                            <div className='title-list'>
                                {/* {list.title} */}
                            </div>
                            <div className='container-cards'>
                                <Droppable droppableId={list.id} type='task'>
                                    {
                                        (provided) => (
                                            <div className='card-container' {...provided.droppableProps} ref={provided.innerRef}>
                                                {
                                                    list.cards.map((card,index) => (
                                                        <h1 key={index}>Cards</h1>
                                                    ))
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }
                                </Droppable>
                            </div>
                            <InputContainer listId={list.id} type="card" />
                        </div>
                    </div>
                )
            }
        </Draggable>
        
    </>
  )
}

export default Lists

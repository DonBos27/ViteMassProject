import { list } from '@material-tailwind/react';
import React from 'react'
import {Droppable, Draggable } from 'react-beautiful-dnd';
import InputContainer from './InputContainer';
import {
    
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
import Card from './Card';
import { List } from '@mui/icons-material';
function Lists({list, index}) {
    console.log(list.id);
  return (
    <>  
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
                                                        <Card 
                                                        key={card.id}
                                                        card={card}
                                                        index={index}
                                                        listId={list.id} 
                                                        />
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

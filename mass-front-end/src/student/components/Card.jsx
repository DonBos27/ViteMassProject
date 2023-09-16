import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import TextareaAutosize from "react-textarea-autosize"
import DeleteIcon from '@mui/icons-material/Delete';

function Card({card, listId,index}) {
    const [open, setOpen] = useState(false);
    const [newTitle, setNewTitle] = useState(card.title)
    const handleBlur = (cardId) => {
        //updateCardTitle
        setOpen((prev) =>!prev)
    }
  return (
    <Draggable draggableId={card.id} index={index}>
        {
            (provided) => (
                <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                >
                    <div className=' min-h-[2.5rem] flex justify-center items-center mx-[1rem] bg-[#ebecf0] rounded-lg border-b-2 relative'>
                        {open ? (
                            <TextareaAutosize
                            type="text"
                            className='w-[100%] h-[100%] pl-[0.7rem] py-[0.5rem] resize-none overflow-hidden border-transparent rounded-lg text-[18px] focus:border-[1px]'
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleBlur(card.id)
                                }
                            }}
                            onBlur={handleBlur}
                            autoFocus
                            />
                        ): (
                            <div onClick={()=> setOpen(prev=>!prev)} className='w-[100%] h-[100%] flex justify-between px-4  text-[18px]'>
                                <p className='p-[0.7rem 0.5rem 0.5rem] max-w-[90%] text-[22px] overflow-hidden break-words'>{card.title}</p>
                                <button className='p-[0.5rem 0.5rem 0 0] bg-none border-none cursor-pointer '>
                                    <DeleteIcon className='hover:fill-primary' />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )
        }
    </Draggable>
  )
}

export default Card

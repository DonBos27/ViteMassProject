import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MoreVert } from '@mui/icons-material';
function Tittle({title,listId}) {
    const [open, setOpen] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const handleOnBlur = () =>{
        setOpen((prev) => !prev);
    }
  return (
    <>
      {open ? (
        <div>
            <input type="text" 
            className='input-title' 
            value={newTitle}
            onChange={(e)=>setNewTitle(e.target.value)}
            onBlur={handleOnBlur}
            onKeyDown={(e)=>{
                if(e.key==="Enter"){
                    handleOnBlur();
                }
            }}  
            />
        </div>
      ):(
        <div className='editable-title-container'>
            <h2 onClick={()=>setOpen(prev=>!prev)}>{title}</h2>
            <button className='list-button' onClick={()=>setOpenOptions(prev=>!prev)}>
                <MoreVertIcon />
                {
                    openOptions && (
                        <div></div>
                    )
                }
            </button>
        </div>
      )}
    </>
  )
}

export default Tittle

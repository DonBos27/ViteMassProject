import React from 'react'
import { useState } from 'react'
import { Collapse } from '@mui/material';
import InputCard from './InputCard';

function InputContainer({listId, type}) {
    const [open, setOpen] = useState(false);
  return (
    <div>
        <Collapse in={open}>
            <InputCard listId={listId} type={type} setOpen={setOpen} />
        </Collapse>
        <Collapse in={!open}>
            <button className="btn btn-primary" onClick={() => setOpen((prev) => !prev)}>
                {type === "card" ? "+ Add card": "Add list"}
            </button>
        </Collapse>
    </div>
  )
}

export default InputContainer

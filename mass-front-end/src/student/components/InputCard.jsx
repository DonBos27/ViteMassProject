import React from 'react'
import { useState } from 'react'
import { Textarea, Button, IconButton } from "@material-tailwind/react";

function InputCard({setOpen, listId, type}) {
    const [title, setTitle] = useState("");
  return (
    <div className='bg-[#fdfdfd] p-[1rem] rounded-lg'>

    <div className="w-50">
      <Textarea  placeholder={
                type === "card" ? "Enter a title for this card..." : "Enter list title..."
            } value={title} onChange={(e) => setTitle(e.target.value)} rows={8} />
      <div className="flex w-full justify-between py-1.5">
        <div className="flex gap-2">
          <Button size="sm" color="red" variant="text" className="rounded-md" onClick={() => setOpen(false)}>
            X
          </Button>
          <Button size="sm" className="rounded-md" onClick={() => setOpen(false)}>
          {type === "card" ? "+ Add card": "Add list"}
          </Button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default InputCard

import { MicNone, MicRounded, Send } from '@mui/icons-material'
import React from 'react'

function ChatFooter() {
    const canRecord = true
    const recordIcons = (
        <>
        <Send style={{width: 20, height: 20, color: 'white'}} />
        <MicRounded style={{width: 24, height: 24, color: 'white'}} />
        </>
    )
  return (
    <div className='chat__footer'>
    <form>
        <input type="text" placeholder='Type a message' />
        {
            canRecord ? (
                <button type='submit' className='send__btn'>
                    {recordIcons}
                </button>
            ) : (
                <>
                <label htmlFor='capture' className='send__btn'>{recordIcons}</label>
                <input type="file" style={{display: 'none'}} id='capture' accept='audio/*' capture />
                </>
            )
        }
    </form>
    </div>
  )
}

export default ChatFooter

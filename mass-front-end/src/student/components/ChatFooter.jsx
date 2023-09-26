import { CancelRounded, CheckCircleRounded, MicNone, MicRounded, Send } from '@mui/icons-material'
import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db, storage } from '../../firebase/configFirebase';
import Compressor from "compressorjs"
function ChatFooter({
    input,
    onChange,
    image,
    user,
    room,
    roomId,
    sendMessage,
    SendRecording,
    closePreview,
    userId,
    setSrc,
    setImage,
    setInput
}) {
    const [text, setText] = useState("")
    async function IsSend(e){
        e.preventDefault()
        setInput("")
        
        if(image) closePreview()
        const imageName = nanoid()
        await setDoc(doc(db, `users/${userId}/chats/${roomId}`),{
            name: room.name,
            photoUrl: room.photoUrl || null,
            timestamp: serverTimestamp()
        })
        const newDoc = await addDoc(collection(db, `rooms/${roomId}/messages`), {
            name: user.email,
            message: input,
            uid: user.uid,
            timestamp: serverTimestamp(),
            time: new Date().toUTCString(),
            ...(image ? {imageUrl: "uploading", imageName}: {})
        });
        if(image){
            new Compressor(image, {
                quality: 0.8,
                maxWidth: 1920,
                async success(result){
                    setSrc('')
                    setImage(null)
                    await uploadBytes(ref(storage, `images/${imageName}`, result))
                    const url = await getDownloadURL(ref(storage, `images/${imageName}`))
                    await updateDoc(doc(db, `rooms/${roomId}/messages/${newDoc.id}`), {
                        imageUrl: url,
                    });
                }
            })
        }
    }
    console.log("Hello user", user.name)
    const canRecord = true
    const isRecording = false
    const canSendMessage = input.trim() || (input === "" && image)
    const recordIcons = (
        <>
        <Send style={{width: 20, height: 20, color: 'white'}} />
        <MicRounded style={{width: 24, height: 24, color: 'white'}} />
        </>
    )
  return (
    <div className='chat__footer'>
    <form>
        <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder='Type a message' style={{
            width: isRecording ? "calc(100% - 20px)" : "calc(100% - 112px)"
            }} />
        {
            canRecord ? (
                <button onClick={canSendMessage ? IsSend : SendRecording} type='submit' className='send__btn bg-[#F26522]'>
                    {recordIcons}
                </button>
            ) : (
                <>
                <label htmlFor='capture' className='send__btn bg-[#F26522]'>{recordIcons}</label>
                <input type="file" style={{display: 'none'}} id='capture' accept='audio/*' capture />
                </>
            )
        }
    </form>
    {isRecording && (
        <div className='record'>
            <CancelRounded style={{width: 30, height: 30, color: "#f20519"}} />
            <div>
                <div className='record__redcircle' />
                <div className='record__duration'>0:00</div>
            </div>
            <CheckCircleRounded style={{width: 30, height: 30, color: "#41bf49"}} />
        </div>
        
    )}
    </div>
  )
}

export default ChatFooter

import React, { useState } from 'react'
import NavbarStudent from '../global/NavbarStudent';
import Sidebar from '../global/Sidebar'
import EventNoteIcon from '@mui/icons-material/EventNote';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import sampleData from "../utils/sampleData"
import Lists from '../components/Lists';
import InputContainer from '../components/InputContainer';
import { v4 as uuid } from 'uuid';
import { addDoc, arrayUnion, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, timestamp } from '../../firebase/configFirebase';
import StoreApi from '../utils/storeApi';
function Trello({handleProfile, lists, setLists}) {
    
    const addMoreCard = async(title,listId)=>{
        if(!title){
            return;
        }
        const newCardId = uuid();
        const newCard = {
            id: newCardId,
            title,
        };

        const listRef = doc(db, "lists",listId);
        await updateDoc(listRef, {
            cards: arrayUnion(newCard),
        });

    }
    const removeCard = (index, listId,cardId) =>{
        const listRef = doc(db, "lists",listId);
        lists.forEach(async(list) =>{
            if(list.id===listId){
                list.cards.splice(index,1)
                await updateDoc(listRef, {
                    cards:list.cards.filter(card=>card.id!== cardId)
                })
            }
            return list;
        });
    };

    const updateCardTitle = (title,index,listId,cardId)=>{
        const listRef = doc(db, "lists",listId);
        lists.forEach(async(list) =>{
            if(list.id===listId){
                list.cards[index].title = title;
                await updateDoc(listRef, {
                    cards:list.cards.map((card)=>{
                        if(card.id===cardId){
                            card.title=title;
                            return card
                        }
                        return card
                    })
                })
            }
            return list;
        })
    }
    const addMoreList = async(title)=>{
        if(!title){
            return;
        }
        await addDoc(collection(db,"lists"),{
            title,
            cards:[],
            timestamp
        })
    }

    const updateListTitle = (title,listId)=>{
        const listRef = doc(db, "lists",listId);
        lists.forEach(async(list) =>{
            if(list.id===listId){
                list.title = title;
                await updateDoc(listRef, {
                    title:title
                })
            }
            return list;
        })
    }

    const deleteList = async(listId)=>{
        await deleteDoc(doc(db,"lists",listId));
    }
    return (
        
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full mr-4 mb-4 mt-4 h-screen">
        <NavbarStudent Icon={EventNoteIcon} title={"Trello"} handleProfile={handleProfile} />
        <StoreApi.Provider
        value={{
            addMoreCard,
            removeCard,
            updateCardTitle,
            addMoreList,
            updateListTitle,
            deleteList
            
        }}
        >
          
            <Droppable droppableId='app' type='list' direction='horizontal'>
                {(provided) => (
                    <div className=" w-[100%] p-[0.5rem] grid gap-y-10 gap-x-5 md:grid-cols-2 xl:grid-cols-4 min-h-[calc(100hv-5rem)] overflow-y-auto" ref={provided.innerRef}>
                        {lists.map((list, index) => {
                            return <Lists key={list.id} list={list} index={index} />
                        })}
                        <div>
                            <InputContainer type="list" />
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
           
        </StoreApi.Provider>
      </div>
    </div>
    
  )
}

export default Trello

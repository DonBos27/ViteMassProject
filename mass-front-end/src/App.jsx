import React, { useEffect, useState } from "react";
import Dashboard from "./admin/pages/Dashboard";
import Routing from "./routes/Routing";
import { AuthProvider } from "./context/AuthContext";
// import { AuthProvider } from "./context/AuthContext";
import { DragDropContext } from "react-beautiful-dnd";
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { db, timestamp } from "./firebase/configFirebase";
import sampleData from "./student/utils/sampleData";

function App() {
  const[lists, setLists] = useState([]);
  useEffect(()=>{
    const q = query(collection(db,"lists"), orderBy("timestamp", "asc"));
    onSnapshot(q, (snapShot) => {
      setLists(snapShot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
      })))
    })
  })
  const onDragEnd = async(result)=>{
    const {destination,source,draggableId,type} = result;

    if(!destination){
      return;
    }
    if(type === "list"){
      const destinationRef = doc(db,"lists",lists[destination.index].id);
      const sourceRef = doc(db,"lists",lists[source.index].id)
      await updateDoc(destinationRef,{
        timestamp:lists[source.index].timestamp
      });
      await updateDoc(sourceRef,{
        timestamp:lists[destination.index].timestamp
      });
      return;
    }
    if(source.droppableId === destination.droppableId){
      const list = lists.find((list)=>list.id===source.droppableId);
      const updatedCards = list.cards.map((card,index) =>{
        if(index===source.index){
          return list.cards[destination.index]
        }
        if(index===destination.index){
          return list.cards[source.index]
        }
        return card;
      })
      const listRef = doc(db,"lists",destination.droppableId);
      await updateDoc(listRef,{
        cards:updatedCards
      })
    }
    else{
      const sourceList = lists.find((list)=>list.id===source.droppableId);
      const destinationList = lists.find((list)=>list.id===destination.droppableId);
      const draggingCard = sourceList.cards.filter((card)=>card.id===draggableId)[0];
      const sourceListRef = doc(db,"lists",source.droppableId);
      sourceList.cards.splice(source.index,1)
      await updateDoc(sourceListRef,{
        cards:sourceList.cards,
      })
      const destinationListRef = doc(db,"lists",destination.droppableId);
      destinationList.cards.splice(destination.index,0,draggingCard);
      await updateDoc(destinationListRef,{
        cards:destinationList.cards,
      })
    }
  }
  return (
    <>
      <div className="bg-[#e5e4e4]">
        <AuthProvider>
          <DragDropContext onDragEnd={onDragEnd}>
            <Routing lists={lists} setLists={setLists} />
          </DragDropContext>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;

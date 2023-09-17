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
    // Destructure relevant properties from the 'result' object
    const {destination,source,draggableId,type} = result;
    // Check if there is no valid destination for the drag-and-drop
    if(!destination){
      return;
    }
    // If the type is "list," swap the positions of two lists
    if(type === "list"){
      // Get references to the source and destination lists in Firestore
      const destinationRef = doc(db,"lists",lists[destination.index].id);
      const sourceRef = doc(db,"lists",lists[source.index].id)
      // Swap the 'timestamp' values between the source and destination lists
      await updateDoc(destinationRef,{
        timestamp:lists[source.index].timestamp
      });
      await updateDoc(sourceRef,{
        timestamp:lists[destination.index].timestamp
      });
      return;
    }
    // If the source and destination droppable IDs are the same, rearrange cards within the same list
    if(source.droppableId === destination.droppableId){
      // Find the list where the drag-and-drop occurred
      const list = lists.find((list)=>list.id===source.droppableId);
      // Create an updated list of cards with the order adjusted
      const updatedCards = list.cards.map((card,index) =>{
        if(index===source.index){
          return list.cards[destination.index]
        }
        if(index===destination.index){
          return list.cards[source.index]
        }
        return card;
      })
      // Get a reference to the Firestore document of the list and update the 'cards' field
      const listRef = doc(db,"lists",destination.droppableId);
      await updateDoc(listRef,{
        cards:updatedCards
      })
    }
    else{
      // Moving a card from one list to another

      // Find the source and destination lists
      const sourceList = lists.find((list)=>list.id===source.droppableId);
      const destinationList = lists.find((list)=>list.id===destination.droppableId);
      // Get the card being dragged
      const draggingCard = sourceList.cards.filter((card)=>card.id===draggableId)[0];
      // Get references to the source and destination lists in Firestore
      const sourceListRef = doc(db,"lists",source.droppableId);
      // Remove the card from the source list
      sourceList.cards.splice(source.index,1)
      // Update the source list in Firestore with the updated 'cards' field
      await updateDoc(sourceListRef,{
        cards:sourceList.cards,
      })
      // Get a reference to the destination list in Firestore
      const destinationListRef = doc(db,"lists",destination.droppableId);
      // Insert the dragging card at the appropriate position in the destination list
      destinationList.cards.splice(destination.index,0,draggingCard);
      // Update the destination list in Firestore with the updated 'cards' field
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

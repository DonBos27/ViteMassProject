import React, { useState } from "react";
import Dashboard from "./admin/pages/Dashboard";
import Routing from "./routes/Routing";
import { AuthProvider } from "./context/AuthContext";
// import { AuthProvider } from "./context/AuthContext";
import { DragDropContext } from "react-beautiful-dnd";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase/configFirebase";
import sampleData from "./student/utils/sampleData";


function App() {
  const[lists, setLists] = useState(sampleData.lists);
  const onDragEnd = async(result)=>{
    const {destination,source,draggableId,type} = result;

    if(!destination){
      return;
    }
    if(type=="list"){
      const destinationRef = doc(db,"lists",lists[destination.index].id);
      const sourceRef = doc(db,"lists",lists[source.index].id)
      await updateDoc(destinationRef,{
        timestamp:lists[source.index].timestamp
      })
      await updateDoc(sourceRef,{
        timestamp:lists[destination.index].timestamp
      })
    }
  }
  return (
    <>
      <div className="bg-blue-gray-50">
        <AuthProvider>
        
            <Routing lists={lists} setLists={setLists} />
        
        </AuthProvider>
      </div>
    </>
  );
}

export default App;

import React from "react";
import Routing from "./routes/Routing";
import { AuthProvider } from "./context/AuthContext";
// import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <>
      <div className="bg-blue-gray-50">
        <AuthProvider>
          <Routing />
        </AuthProvider>
      </div>
    </>
  );
}

export default App;

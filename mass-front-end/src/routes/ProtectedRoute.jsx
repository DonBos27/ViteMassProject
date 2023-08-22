import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false); // User data is available, loading is done
    }
  }, [user]);

  if (isLoading) {
    return <div>404 ERROR ...</div>; // You can show a loading indicator
  }

  if (!user || !user.email) {
    return <Navigate to="/" />;
  }

  const email = user.email;
  if (email.endsWith("@admin.uj.ac.za")) {
    console.log("admin");
    return children;
  } else if (email.endsWith("@student.uj.ac.za")) {
    console.log("student");
    return children;
  } else if (email.endsWith("@uj.ac.za")) {
    console.log("staff");
    return children;
  } else {
    console.log("other");
    return <Navigate to="/" />;
  }
}

export default ProtectedRoute;

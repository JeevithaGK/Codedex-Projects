import React, { createContext, useState } from "react";

// Context
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

// Provider
export function UserProvider({ children }) {
  const [name, setName] = useState("");

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
}

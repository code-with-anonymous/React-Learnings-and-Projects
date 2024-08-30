import React, { createContext, useState, useContext, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "../Config/Firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState([]);
  const [itemData, setItemData] = useState([]);

  const readItems = async () => {
    const querySnapshot = await getDocs(collection(fireStore, "items"));
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItemData(items);
    console.log('items', items)
  };

  useEffect(() => {
    readItems();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        itemData,
        setItemData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};

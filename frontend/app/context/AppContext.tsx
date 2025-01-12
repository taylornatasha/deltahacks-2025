import React, { createContext, useState, useContext, useMemo } from 'react';

interface AppContextProps {
  uid: number | null;
  setUid: (uid: number) => void;
  clearUid: () => void;
}

// Create the context
const AppContext = createContext<AppContextProps | undefined>(undefined);

// AppProvider component to wrap the app and provide context
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uid, setUidState] = useState<number | null>(null);

  const setUid = (newUid: number) => {
    setUidState(newUid);
  };

  const clearUid = () => {
    setUidState(null);
  };

  // Memoize the context value to optimize performance
  const contextValue = useMemo(() => ({ uid, setUid, clearUid }), [uid]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

import React, { createContext, useState, useContext } from "react";
import { Spin } from "antd";

interface LoadingContextType {
  setLoading: (bool: boolean) => void;
  setLoadingText: (text: string) => void;
}

const defaultLoadingContext: LoadingContextType = {
  setLoading: () => {},
  setLoadingText: () => {},
};

const LoadingContext = createContext<LoadingContextType>(defaultLoadingContext);

export const useLoading = () => useContext(LoadingContext);

export const LoadingContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [loading, setLoadingState] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");

  const setLoading = (bool: boolean) => {
    setLoadingState(bool);
    setTimeout(() => {
      setLoadingState(false);
      setLoadingText("");
    }, 20000);
  };

  return (
    <LoadingContext.Provider value={{ setLoading, setLoadingText }}>
      <Spin fullscreen tip={loadingText} spinning={loading} />
      {children}
    </LoadingContext.Provider>
  );
};

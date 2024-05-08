"use client";

import React, { createContext, useState, useContext } from "react";

const ResultsContext = createContext();

export const ResultsProvider = ({ children }) => {
  const [results, setResults] = useState(-1);

  return <ResultsContext.Provider value={{ results, setResults }}>{children}</ResultsContext.Provider>;
};

export const useResults = () => useContext(ResultsContext);

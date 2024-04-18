'use client';
import React, { ReactNode, createContext, useContext, useState } from 'react';

const TagContext = createContext<any>(null);

export const useTagContext = () => useContext(TagContext);

export const TagProvider = ({ children }: {children: ReactNode}) => {
  const [tags, setTags] = useState([]);

  return (
    <TagContext.Provider value={{ tags, setTags }}>
      {children}
    </TagContext.Provider>
  );
};

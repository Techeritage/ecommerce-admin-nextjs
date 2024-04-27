'use client';
import React, { ReactNode, createContext, useContext, useState } from 'react';

const ParentCategoryContext = createContext<any>(null);

export const useParentCategoryContext = () => useContext(ParentCategoryContext);

export const ParentCategoryProvider = ({ children }: {children: ReactNode}) => {
  const [parentCategories, setParentCategories] = useState([]);

  return (
    <ParentCategoryContext.Provider value={{ parentCategories, setParentCategories }}>
      {children}
    </ParentCategoryContext.Provider>
  );
};

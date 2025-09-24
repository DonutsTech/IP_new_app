"use client";
import { createContext, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ReactNode } from 'react';

interface IsMobileContextType {
  isMobile: boolean;
  isMobileVideo: boolean;
}

const isMobileContext = createContext<IsMobileContextType>({
  isMobile: false,
  isMobileVideo: false,
});

interface IsMobileProviderProps {
  children: ReactNode;
}

export const IsMobileProvider = ({ children }: IsMobileProviderProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobileVideo = useMediaQuery({ query: '(max-width: 426px)' });
  return (
    <isMobileContext.Provider value={{isMobile, isMobileVideo}}>
      {children}
    </isMobileContext.Provider>
  );
};

export const useIsMobile = () => {
  return useContext(isMobileContext);
};

export const useIsMobileVideo = () => {
  return useContext(isMobileContext).isMobileVideo;
};
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FlowStatsContextType {
  nodeCount: number;
  setNodeCount: (count: number) => void;
}

const FlowStatsContext = createContext<FlowStatsContextType | undefined>(undefined);

export const useFlowStats = () => {
  const context = useContext(FlowStatsContext);
  if (!context) {
    throw new Error('useFlowStats deve ser usado dentro de um FlowStatsProvider');
  }
  return context;
};

interface FlowStatsProviderProps {
  children: ReactNode;
}

export const FlowStatsProvider: React.FC<FlowStatsProviderProps> = ({ children }) => {
  const [nodeCount, setNodeCount] = useState(0);

  return (
    <FlowStatsContext.Provider value={{ nodeCount, setNodeCount }}>
      {children}
    </FlowStatsContext.Provider>
  );
};

export default FlowStatsContext;

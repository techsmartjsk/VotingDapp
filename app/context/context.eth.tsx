'use client'

import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';

// Define the context shape
interface EthereumContextType {
  ethereum: EthereumObject | null;
  connectedAccount: string;
  setEthereum: (ethereum: EthereumObject | null) => void;
  setConnectedAccount: (account: string) => void;
}

interface EthereumObject {
  request: (args: any) => Promise<any>;
}

// Create the context
const EthereumContext = createContext<EthereumContextType | undefined>(undefined);

// Define the EthereumProvider component
export function EthereumProvider({ children }: { children: ReactNode }) {
  const [ethereum, setEthereum] = useState<EthereumObject | null>(null);
  const [connectedAccount, setConnectedAccount] = useState<string>('');

  return (
    <EthereumContext.Provider value={{ ethereum, connectedAccount, setEthereum, setConnectedAccount }}>
      {children}
    </EthereumContext.Provider>
  );
}

// Custom hook to access the context
export function useEthereumContext() {
  const context = useContext(EthereumContext);
  if (context === undefined) {
    throw new Error('useEthereumContext must be used within an EthereumProvider');
  }
  return context;
}

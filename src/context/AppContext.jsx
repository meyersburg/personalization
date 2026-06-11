import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [mockMode, setMockMode] = useState(true);
  const [leadData, setLeadData] = useState(null);
  const [enrichment, setEnrichment] = useState(null);
  const [personalization, setPersonalization] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider value={{
      mockMode, setMockMode,
      leadData, setLeadData,
      enrichment, setEnrichment,
      personalization, setPersonalization,
      loading, setLoading,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

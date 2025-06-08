import { useContext } from 'react';
import { LinksStateContext } from './context';

export const useLinksState = () => {
  const context = useContext(LinksStateContext);
  if (context === undefined) {
    throw new Error('useLinksState must be used within a LinksProvider');
  }
  return context;
};

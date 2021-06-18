import { useContext } from 'react';
import { TrelloContext } from '../components';

const useProvidedTrello = () => {
  return useContext(TrelloContext);
};

export default useProvidedTrello;

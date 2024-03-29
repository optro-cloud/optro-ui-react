import React, { useEffect, useState } from 'react';
import { Trello, TrelloProviderProps } from '../../types';
import { useTrelloApi } from '../../hooks';

export const TrelloContext = React.createContext<Trello.PowerUp.IFrame | undefined>(undefined);

const TrelloProvider = (props: TrelloProviderProps): JSX.Element => {
  const [context, setContext] = useState(props.t);
  useEffect(() => {
    if (!props.t) {
      setContext(useTrelloApi());
    } else {
      setContext(props.t);
    }
  }, [props.t]);

  return (
    <TrelloContext.Provider value={context}>
      {props.children}
    </TrelloContext.Provider>
  );
};

export default TrelloProvider;

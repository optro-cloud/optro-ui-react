import React, { useContext } from 'react';
import { TrelloContext } from '../components';
import {Trello} from "../types";

const useProvidedTrello = () => {
  return useContext<Trello.PowerUp.IFrame>(TrelloContext as React.Context<Trello.PowerUp.IFrame>);
};

export default useProvidedTrello;

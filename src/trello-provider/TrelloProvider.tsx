import * as React from "react";
import {TrelloProviderProps} from "../types/types";
import {useEffect, useState} from "react";
import {Trello} from "../types/trello";
export const TrelloContext = React.createContext<Trello.PowerUp.IFrame | undefined>(undefined);

const TrelloProvider = (props: TrelloProviderProps) => {

    const [context, setContext] = useState(props.t);
    useEffect( () => {
        if(!props.t){
            setContext(useTrelloApi());
        }
        else{
            setContext(props.t)
        }
    }, [props.t])

    return (
        <TrelloContext.Provider value={context}>
            {props.children}
        </TrelloContext.Provider>
    );
};

export default TrelloProvider;

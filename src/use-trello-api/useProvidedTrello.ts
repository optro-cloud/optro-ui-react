import {useContext} from "react";
import {TrelloContext} from "../trello-provider/TrelloProvider";

const useProvidedTrello = () => {
    return useContext(TrelloContext);
};

export default useProvidedTrello;

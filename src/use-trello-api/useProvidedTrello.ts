import {useContext} from "react";
import {TrelloContext} from "../trello-provider/TrelloProvider";

const useLicense = () => {
    return useContext(TrelloContext);
};

export default useLicense;
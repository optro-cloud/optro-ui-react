import {useContext} from "react";
import {ContextedLicense} from "../components";

const useLicense = () => {
    return useContext(ContextedLicense);
};

export default useLicense;

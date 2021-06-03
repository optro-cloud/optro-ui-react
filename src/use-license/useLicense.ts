import { ContextedLicense } from "../license-provider/LicenseProvider";
import {useContext} from "react";

const useLicense = () => {
    return useContext(ContextedLicense);
};

export default useLicense;

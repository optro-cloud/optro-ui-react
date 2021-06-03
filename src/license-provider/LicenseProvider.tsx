import * as React from "react";
import { LicenseTypeBoard } from "../common/globals";
import { LicenseContext, LicenseProviderProps } from "../types/types";

const defaultContext: LicenseContext = {
    loading: true,
    licensed: false,
    expired: false,
    powerupId: "",
    licenseType: LicenseTypeBoard,
    licenseId: ""
};

export const ContextedLicense = React.createContext(defaultContext);

const LicenseProvider = (props: LicenseProviderProps) => {
    return (
        <ContextedLicense.Provider value={defaultContext}>
            {props.children}
        </ContextedLicense.Provider>
    );
};

export default LicenseProvider;

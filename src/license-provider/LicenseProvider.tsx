import * as React from "react";
import {LicenseTypeBoard, LicenseTypeUser} from "../common/globals";
import { LicenseContext, LicenseProviderProps } from "../types/types";
import { OptroLicenseResponse } from '@optro/api-client';
import {useContext, useEffect, useState} from "react";
import {TrelloContext} from "../trello-provider/TrelloProvider";
import {Trello} from "../types/trello";

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

    const tContext = useContext(TrelloContext);

    const [context, setContext] = useState<LicenseContext>({
        loading: true,
        licensed: false,
        expired: false,
        powerupId: props.powerupId,
        licenseType: props.licenseType ?? 'board',
        licenseId: ''
    })

    const processResults = (result: OptroLicenseResponse ) => {
        return {
            expired : result.isRegistered && !result.isLicensed,
            licensed : result.isRegistered && result.isLicensed
        }
    }

    useEffect(() => {
        const t: Trello.PowerUp.IFrame | undefined = props.t ?? tContext;
        if(t){
            let newContext = {...context, loading: true};
            if (props.licenseType == LicenseTypeUser) {
                newContext.licenseId= t.getContext().member;
                props.optroClient.getMemberLicenseStatus(newContext.licenseId).then((result: OptroLicenseResponse ) => {
                    newContext = {...newContext , loading: false, ...processResults(result)};
                    setContext(newContext);
                }).catch(function(error: any) {
                    console.error(error);
                });
            } else if (props.licenseType == LicenseTypeBoard) {
                newContext.licenseId= t.getContext().board;
                props.optroClient.getBoardLicenseStatus(newContext.licenseId).then((result: OptroLicenseResponse ) => {
                    newContext = {...newContext , loading: false, ...processResults(result)};
                    setContext(newContext);
                }).catch(function(error: any) {
                    console.error(error);
                });
            }
            else {
                throw new Error('Non standard license type provided. Use "board" or "user"');
            }
            setContext(newContext);
        } else {
            throw new Error('No Trello t parameter provided through context or properties');
        }
    }, [tContext,props.t]);

    return (
        <ContextedLicense.Provider value={context}>
            {props.children}
        </ContextedLicense.Provider>
    );
};

export default LicenseProvider;

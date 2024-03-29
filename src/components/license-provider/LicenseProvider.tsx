import React, { useContext, useEffect, useState } from 'react';
import { OptroLicenseResponse } from '@optro/api-client/dist/types';
import { LicenseContext, LicenseProviderProps, Trello } from '../../types';
import {
  LicenseTypeBoard,
  LicenseTypeOrganisation,
  LicenseTypeUser,
  LicenseTypeWorkspace,
} from '../../common';
import { TrelloContext } from '../trello-provider';

const defaultContext: LicenseContext = {
  loading: true,
  licensed: false,
  expired: false,
  errored: false,
  powerupId: '',
  licenseType: LicenseTypeBoard,
  licenseId: '',
};

export const ContextedLicense = React.createContext(defaultContext);

const LicenseProvider = (props: LicenseProviderProps): React.ReactElement => {
  const tContext = useContext(TrelloContext);

  let override: boolean | undefined;
  if (props.overrideLicense === 'pro') {
    override = true;
  } else if (props.overrideLicense === 'free') {
    override = false;
  } else {
    override = undefined;
  }

  const [context, setContext] = useState<LicenseContext>({
    loading: true,
    licensed: override || false,
    expired: false,
    errored: false,
    powerupId: props.powerupId,
    licenseType: props.licenseType ?? 'board',
    licenseId: '',
  });

  const processResults = (result: OptroLicenseResponse) => {
    return {
      loading: false,
      expired: result.isRegistered && !result.isLicensed,
      licensed: override || (result.isRegistered && result.isLicensed),
    };
  };

  useEffect(() => {
    const t: Trello.PowerUp.IFrame | undefined = props.t ?? tContext;
    if (t) {
      let newContext = { ...context };

      // Escape clause if monetization is inactive
      if (props.apiKey === 'UNSPECIFIED') {
        setContext({
          ...newContext,
          loading: false,
          expired: false,
          licensed: override || true,
          inactive: true,
        });
        return;
      }

      if (props.licenseType === LicenseTypeUser) {
        newContext.licenseId = t.getContext().member;
        props.optroClient.getMemberLicenseStatus(newContext.licenseId)
          .then((result: OptroLicenseResponse) => {
            newContext = { ...newContext, ...processResults(result) };
            setContext(newContext);
          }).catch((error: any) => {
            console.error('An error occurred while checking the license:', error);
            newContext = { ...newContext, loading: false, errored: true };
            setContext(newContext);
          });
      } else if (props.licenseType === LicenseTypeBoard) {
        newContext.licenseId = t.getContext().board;
        props.optroClient.getBoardLicenseStatus(newContext.licenseId)
          .then((result: OptroLicenseResponse) => {
            newContext = { ...newContext, ...processResults(result) };
            setContext(newContext);
          }).catch((error: any) => {
            console.error('An error occurred while checking the license:', error);
            newContext = { ...newContext, loading: false, errored: true };
            setContext(newContext);
          });
      } else if (
        props.licenseType === LicenseTypeOrganisation
        || props.licenseType === LicenseTypeWorkspace) {
        const organisationId = t.getContext().organization;
        if (organisationId) {
          newContext.licenseId = organisationId;
        } else {
          console.error('Board is not associated with an organisation');
          newContext = { ...newContext, loading: false, errored: true};
          setContext(newContext);
        }
        props.optroClient.getOrganisationLicenseStatus(newContext.licenseId)
          .then((result: OptroLicenseResponse) => {
            newContext = { ...newContext, ...processResults(result) };
            setContext(newContext);
          }).catch((error: any) => {
            console.error('An error occurred while checking the license:', error);
            newContext = { ...newContext, loading: false, errored: true };
            setContext(newContext);
          });
      } else {
        throw new Error('Non standard license type provided. Use "board", "user", or "organisation"');
      }
      setContext(newContext);
    } else {
      throw new Error('No Trello t parameter provided through context or properties');
    }
  }, [tContext, props.t]);

  return (
    <ContextedLicense.Provider value={context}>
      {props.children}
    </ContextedLicense.Provider>
  );
};

export default LicenseProvider;

import React from 'react';
import SimpleLoader from '../../loader/SimpleLoader';
import { localization, OptroBaseUrl } from '../../common';
import { LocaleKey, SubscriptionStatusProps } from '../../types';
import { useLicense } from '../../hooks';
import './styles.scss';

const LicenseStatus = (props: SubscriptionStatusProps): React.ReactElement => {
  const locale: LocaleKey = props.locale
    ? props.locale
    : 'en';
  const proHref: string = props.powerupId
    ? `${OptroBaseUrl}/app/${props.powerupId}`
    : OptroBaseUrl;
  const license = useLicense();

  if (license.inactive) {
    return <></>;
  }

  if (props.isPro == null && license.errored) {
    return (
      <div className="license-display license-display-error">
        <div className="information-icon">i</div>
        <a href="https://www.google.com">Unable to retrieve license status</a>
      </div>
    );
  }

  if (props.isPro == null && license.loading) {
    return (
      <div className="license-display license-display-pro">
        <SimpleLoader colour="white" />
      </div>
    );
  }

  if (props.isPro || (props.isPro == null && license.licensed)) {
    return (
      <div className="license-display license-display-pro">
        <span>
          {localization[locale].messagePro}
        </span>
        <a
          className="license-display-link"
          href={`${OptroBaseUrl}/account`}
          target="_blank" rel="noreferrer"
        >
          {localization[locale].linkTextPro}
        </a>
      </div>
    );
  }
  return (
    <div className="license-display license-display-free">
      <span>
        {localization[locale].messageFree}
      </span>
      <a
        className="license-display-link"
        href={proHref}
        target={proHref !== '#' ? '_blank' : undefined}
        onClick={props.onGetPro} rel="noreferrer"
      >
        {localization[locale].linkTextFree}
      </a>
    </div>
  );
};

export default LicenseStatus;

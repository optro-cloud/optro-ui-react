import React from 'react';
import { localization, OptroBaseUrl } from '../../common';
import { LocaleKey, SubscriptionStatusProps } from '../../types';
import './styles.scss';

const LicenseStatus = (props: SubscriptionStatusProps) => {
  const locale: LocaleKey = props.locale
    ? props.locale
    : 'en';
  const proHref: string = props.powerupId
    ? `${OptroBaseUrl}/app/${props.powerupId}`
    : OptroBaseUrl;

  if (props.isPro) {
    return (
      <div className="license-display license-display-pro">
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
  }
  return (
    <div className="license-display license-display-free">
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
};

export default LicenseStatus;

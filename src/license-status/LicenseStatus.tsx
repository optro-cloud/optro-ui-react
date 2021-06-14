import * as React from "react";
import {LocaleKey, SubscriptionStatusProps} from "../types/types";
import {localization} from "../localization/i18n";
import './styles.scss';
import {OptroBaseUrl} from "../common/globals";

const LicenseStatus = (props: SubscriptionStatusProps ) => {
    const locale: LocaleKey = props.locale
        ? props.locale
        : "en";
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
                    target={proHref !== "#" ? "_blank" : undefined}
                    onClick={props.onGetPro}
                >
                    {localization[locale].linkTextFree}
                </a>
            </div>
        );
    } else {
        return (
            <div className="license-display license-display-free">
                <span>
                    {localization[locale].messagePro}
                </span>
                <a
                    className="license-display-link"
                    href={`${OptroBaseUrl}/account`}
                    target="_blank"
                >
                    {localization[locale].linkTextPro}
                </a>
            </div>
        );
    }
}

export default LicenseStatus;

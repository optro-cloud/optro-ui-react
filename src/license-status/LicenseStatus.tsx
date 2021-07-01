import * as React from "react";
import {LocaleKey, SubscriptionStatusProps} from "../types/types";
import {localization} from "../localization/i18n";
import './styles.scss';
import {OptroBaseUrl} from "../common/globals";
import {useLicense} from "../index";
import SimpleLoader from "../loader/SimpleLoader";

const LicenseStatus = (props: SubscriptionStatusProps ) => {
    const locale: LocaleKey = props.locale
        ? props.locale
        : "en";
    const proHref: string = props.powerupId
        ? `${OptroBaseUrl}/app/${props.powerupId}`
        : OptroBaseUrl;

    const license = useLicense();


  if(props.isPro == undefined && license.errored){
    return (
      <div className="license-display license-display-error">
        <div className={'information-icon'}>i</div><a href={"https://www.google.com"}>Unable to retrieve license status</a>
      </div>
    )
  }

    if(props.isPro == undefined && license.loading){
      return (
        <div className="license-display license-display-pro">
              <SimpleLoader colour={"white"}/>
        </div>
      )
    }

    if (
      (props.isPro!=null && props.isPro)
      || (props.isPro == undefined && license.licensed)
    ) {
        return (
            <div className="license-display license-display-pro">
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
    } else {
        return (
            <div className="license-display license-display-free">
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
    }
}

export default LicenseStatus;

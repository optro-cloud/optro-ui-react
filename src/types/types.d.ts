import * as React from "react";

export type LocaleKey = "en" | "fr" | "de" | "es";

export type LicenseType = "board" | "user";

export interface LicenseContext {
    loading?: boolean;
    licensed: boolean;
    expired: boolean;
    powerupId: string;
    licenseType: LicenseType;
    licenseId: string;
}

export interface LicenseProviderProps {
    apiKey: string;
    powerupId: string;
    children: React.ReactNode;
}

export interface LicenseConditionalProps {
    loading?: React.ReactNode;
    licensed?: React.ReactNode;
    unlicensed?: React.ReactNode;
    children?: React.ReactNode;
}


export interface SubscriptionStatusProps {
    isPro: boolean;
    locale?: LocaleKey;
    powerupId?: string;
    onGetPro?: () => void;
}

export interface LocaleInstance {
    messageFree: string;
    messagePro: string;
    linkTextFree: string;
    linkTextPro: string;
}

export interface LocaleMap {
    en: LocaleInstance;
    fr: LocaleInstance;
    de: LocaleInstance;
    es: LocaleInstance;
}

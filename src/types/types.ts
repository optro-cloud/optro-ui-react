import React from 'react';
import { Trello } from './trello';

export type LocaleKey = 'en' | 'fr' | 'de' | 'es';

export type LicenseType = 'board' | 'user' | 'organisation';

export interface LicenseContext {
    loading?: boolean;
    licensed: boolean;
    expired: boolean;
    errored: boolean;
    powerupId: string;
    licenseType: LicenseType;
    licenseId: string;
    inactive?: boolean;
}

export interface LicenseProviderProps {
    apiKey: string;
    powerupId: string;
    licenseType?: LicenseType;
    t?: Trello.PowerUp.IFrame;
    optroClient?: any;
    children?: React.ReactNode | React.ReactElement;
    overrideLicense?: LicenseOverride;
}

export type LicenseOverride = 'free' | 'pro' | undefined;

export interface TrelloProviderProps {
    t: Trello.PowerUp.IFrame;
    children?: React.ReactNode | React.ReactElement;
}

export interface LicenseConditionalProps {
    loading?: React.ReactElement;
    licensed?: React.ReactElement;
    unlicensed?: React.ReactElement;
    children?: React.ReactElement;
}

export interface SubscriptionStatusProps {
    isPro?: boolean;
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

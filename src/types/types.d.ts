export type LocaleKey = "en" | "fr" | "de" | "es";

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

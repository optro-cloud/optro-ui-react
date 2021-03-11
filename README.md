# @optro/ui-react

*This project is currently in pre-release. It is not ready for mainstream usage*

This repository contains pre-built React components that can be used in Power-Ups that include Optro Monetization support.

It provides an easy way to provide a consistent experience across all premium Power-Ups.

Can be used with the @optro/api-client library.

1. Install the Package

```
yarn add @optro/api-client
```

2. Import it into your React component

```
import {SubscriptionStatus} from "@optro/ui-react/src/subscription-status/SubscriptionStatus";
```

3. Pass in the required parameters in your JSX

```
<SubscriptionStatus
    isPro={isTheUserLicensed}
    onGetPro={functionToCallOnUpsell}
    powerupId={yourPowerupId}
    locale={one of "en" | "de" | "fr" | "es", or window.locale}
/>
```

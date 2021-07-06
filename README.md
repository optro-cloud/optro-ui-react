# Optro UI for Trello
![optro-sdk](https://img.shields.io/badge/Optro-SDK-blue)
![npm](https://img.shields.io/npm/v/@optro/ui-react)
[![Release Package](https://github.com/optro-cloud/optro-ui-react/actions/workflows/main.yml/badge.svg)](https://github.com/optro-cloud/optro-ui-react/actions/workflows/main.yml)

The Optro UI library makes creating new Trello Power-Ups with React easier than ever, with useful hooks, components and types such as:
* Access the Trello API (t) with React Hooks or JSX components using a Higher Order Component.
* Check the License Status of a particular Member or Board using the Optro License API and automatically enable/disable features based on their subscription plan in Optro.

If you're looking for a way to generate a new Trello Power-Up with best practice built-in, check out the [create-trello-powerup](https://github.com/optro-cloud/create-trello-powerup) npm package to generate new Power-Ups from your command line.

Alternatively, an example of using the Trello Provider and Hooks can be found in the [trello-powerup-full-sample](https://github.com/optro-cloud/trello-powerup-full-sample/blob/main/src/router.tsx#L17) repository

## Installation

Before you can use the Optro UI, you need to install it:

```console
# Using Yarn
yarn add @optro/api-client

# Using NPM
npm install @optro/api-client
```

##  Access the Trello API with React

Find out how to access the Trello API throughout your Power-Up using the [TrelloProvider](https://github.com/optro-cloud/optro-ui-react/blob/main/src/trello-provider/TrelloProvider.tsx) at the root level and then calling the [useTrelloApi](https://github.com/optro-cloud/optro-ui-react/blob/main/src/use-trello-api/useTrelloApi.ts) hook to access the client.

First, place the following code at the root of your project:

```jsx
import {TrelloProvider} from '@optro/ui-react';
const t = window.TrelloPowerUp.iframe();

function ReactRoot() {
  return (
    <TrelloProvider t={t}>
      ...
    </TrelloProvider>
  );
}
```

Next, use the following React Hook which provides access to the [Trello API](https://developer.atlassian.com/cloud/trello/power-ups/client-library/getting-and-setting-data/) in a component that is lower down the hierarchy:

```jsx
import {useProvidedTrello} from '@optro/ui-react';

function ReactComponent() {
  const t = useProvidedTrello();
  // Use the Trello API
  t.showCard(item.card.id);
}
```

## Optro Monetization Components

The [Optro Marketplace](https://www.optro.cloud) provides a centralized platform for customers to subscribe to premium features in Trello Power-Ups.

If you're the vendor of a Trello Power-up, find out how you can monetize your application by [signing up as an Optro Vendor](https://vendor.optro.cloud), getting your API Key and listing your Power-Up on the market, along with making code-level changes as described below to integrate your app with the Optro platform.

You can get started with a basic monetized Power-Up using the provided [Power-Up generator](https://github.com/optro-cloud/create-trello-powerup), or use the components below along with the [Optro  API client](https://github.com/optro-cloud/optro-api-client) to customize the implementation to your application and allow/disallow features and content based on the customer's subscription status.

### Provide access to the Optro License status

Using the same pattern as the Trello API Provider, you can access the license status of members or boards from Optro.

First of all, add the [LicenseProvider](https://github.com/optro-cloud/optro-ui-react/blob/main/src/license-provider/LicenseProvider.tsx) higher-order component (HOC) to the root of your React project (e.g. router):

```jsx
import {LicenseProvider, TrelloProvider} from '@optro/ui-react';  
import {OptroLicenseApi} from '@optro/api-client';

// Create a caching Optro License API client
const optroClient = new OptroLicenseApi(
  OPTRO_API_KEY,
  POWERUP_ID
);

function ReactRoot() {
  return ( 
    <LicenseProvider
      apiKey={OPTRO_API_KEY}    // get it from vendor.optro.cloud
      powerupId={POWERUP_ID}     // get it from trello.com/power-ups/admin
      optroClient={optroClient}    // Optro API Client (see above)
      licenseType={'board'}     // License by 'board' or 'member' (less common)
    >
      ...
    </LicenseProvider>
  );
}
```

You can then access the license status of the board or member using the [useLicense](https://github.com/optro-cloud/optro-ui-react/blob/main/src/use-license/useLicense.ts) hook in any component further down the hierarchy:

```jsx
import {useLicense} from '@optro/ui-react';

function ReactComponent() {
  const lic = useLicense();
  if(lic.licensed) {
    // we have a licensed user
  }
}
```

### Conditionally Allow/Deny Features (Paywalling)

If you are making certain features subscription-only, you may want to hide, or render alternative content when the user does not have a valid subscription.

Using the [LicenseConditional](https://github.com/optro-cloud/optro-ui-react/blob/main/src/license-conditional/LicenseConditional.tsx) component, you can display different content based on the LicenseProvider data:

```jsx
import {LicenseConditional} from '@optro/ui-react';

<LicenseConditional
  unlicensed={<div>This is rendered when the user is not licensed</div>}
>
  This is rendered when the user has a valid subscription
</LicenseConditional>
```

### Display Licence Status

This component helps you indicate what level of subscription a customer has and provide an easy way for users to start a subscription, or manage their existing subscription.

[LicenseStatus](https://github.com/optro-cloud/optro-ui-react/blob/main/src/license-status/LicenseStatus.tsx) shows on screen the status of the current board or member license with a link to subscribe or manage their existing subscription:

```jsx
import {LicenseStatus} from '@optro/ui-react';
import '@optro/ui-react/bundle.css';

// use the JSX element in your components
<LicenseStatus
    isPro={lic.licensed} // You can get this boolean from the useLicense() hook
    onGetPro={functionToCallOnUpsell} // You can call a function when the user wants to upgrade (e.g. direct to Optro Listing page)
    powerupId={yourPowerupId}
    locale={one of "en" | "de" | "fr" | "es"} // Trello provides window.locale for this
/>
```

## Contributing

We welcome contributions to the source code - just raise a Pull Request!

## License

This library, excluding branding is provided under the MIT License.

## About Optro

[Optro](https://www.optro.cloud) is the best place to discover new Pro Power-ups for Trello.

Using [Optro Vendor](https://vendor.optro.cloud), you can learn how to build Power-Ups with best practice and monetization features baked right in!

Use the tools provided with Optro and generate revenue from your innovative Power-up ideas:
* https://github.com/optro-cloud/create-trello-powerup
* https://github.com/optro-cloud/trello-powerup-full-sample
* https://github.com/optro-cloud/optro-ui-react
* https://github.com/optro-cloud/optro-api-client

View our getting started guide over on the [Optro Vendor Docs](https://docs.appfox.io/optro-vendor/) site.

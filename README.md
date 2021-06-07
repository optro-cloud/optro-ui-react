
# Optro UI for Trello

The Optro UI library makes creating new Trello Power-Ups with React easier than ever, with useful hooks, components and types such as:
* Access the Trello API (t) with React Hooks or JSX components using a Higher Order Component.
* Check the License Status of a particular Member or Board using the Optro License API and automatically enable/disable features based on their subscription plan in Optro.

If you're looking for a way to generate a new Trello Power-Up with best practice built-in, check out the [create-trello-powerup](https://github.com/optro-cloud/create-trello-powerup) npm package to generate new Power-Ups from your command line.

Alternatively, an example of using the Trello Provider and Hooks can be found in the [trello-powerup-full-sample](https://github.com/optro-cloud/trello-powerup-full-sample/blob/main/src/router.tsx#L17) repository

## Installation

Before you can use the Optro UI, you need to install it:

```
// Using Yarn
yarn add @optro/api-client

// Using NPM
npm install @optro/api-client
```

##  Access the Trello API with React

Find out how to access the Trello API throughout your Power-Up using the [TrelloProvider](https://github.com/optro-cloud/optro-ui-react/blob/main/src/trello-provider/TrelloProvider.tsx) at the root level and then calling the [useTrelloApi](https://github.com/optro-cloud/optro-ui-react/blob/main/src/use-trello-api/useTrelloApi.ts) hook to access the client.

First, place the following code at the root of your project:

```
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

```
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

```
import {LicenseProvider, TrelloProvider} from '@optro/ui-react';  
import {OptroLicenseApi} from '@optro/api-client/dist';

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

```
import {useLicense} from '@optro/ui-react';

function ReactComponent() {
  const lic = useLicense();
  if(lic.licensed) {
    // we have a licensed user
  }
}
```

### Conditionally Allow/Deny Features (Paywalling)

TODO

[LicenseConditional](https://github.com/optro-cloud/optro-ui-react/blob/main/src/license-conditional/LicenseConditional.tsx) - display different content based on whether the Trello Board or Member has paid for a subscription (paywall)

### Display Licence Status

TODO 

[LicenseStatus](https://github.com/optro-cloud/optro-ui-react/blob/main/src/license-status/LicenseStatus.tsx) - show on screen the status of the current board or member with a link to subscribe or manage their existing subscription

```
<LicenseStatus
    isPro={isTheUserLicensed}
    onGetPro={functionToCallOnUpsell}
    powerupId={yourPowerupId}
    locale={one of "en" | "de" | "fr" | "es", or window.locale}
/>
```

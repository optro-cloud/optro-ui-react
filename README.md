# Optro UI for Trello
![optro-sdk](https://img.shields.io/badge/Optro-SDK-blue)
![npm](https://img.shields.io/npm/v/@optro/ui-react)
[![Release Package](https://github.com/optro-cloud/optro-ui-react/actions/workflows/main.yml/badge.svg)](https://github.com/optro-cloud/optro-ui-react/actions/workflows/main.yml)

The Optro UI library makes creating new Trello Power-Ups with React easier than ever, with useful hooks, components and types such as:
* Use React Hooks or JSX components using a Higher Order Component to access the Trello API (t).
* Check the [Optro](https://vendor.optro.cloud/) License Status of a particular Member or Board using the Optro License API and automatically enable/disable features based on their subscription plan in [Optro](https://www.optro.cloud/).

If you're looking for a way to build Trello Power-Ups with best practice built-in, check out our [Power-Up Generator](https://github.com/optro-cloud/create-trello-powerup) which will create you a new Power-Up from your command line.

Alternatively, an example of using the Trello Provider and Hooks can be found in the [trello-powerup-full-sample](https://github.com/optro-cloud/trello-powerup-full-sample/blob/main/src/router.tsx#L17) repository

## Installation

Before you can use the Optro UI, you need to install it:

```console
# Using Yarn
yarn add @optro/ui-react

# Using NPM
npm install @optro/ui-react
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

## Adding monetization to your Power-up

[Optro Market](https://www.optro.cloud) is the first central marketplace for Trello users to purchase paid features in Trello Power-Ups.

It is available for new and existing Power-Up vendors, but the steps will differ slightly as detailed below:
* **New Power-Up Vendor** – we recommend building a Power-Up using the Generator which will integrate the monetization features. You can then use the [Optro API Client](https://www.npmjs.com/package/@optro/api-client) to customize the implementation in your Power-Up and allow/disallow features and content based on the customer’s subscription status.
* **Existing Power-Up Vendor** – you can easily integrate monetization into your Power-Up by registering with [Optro Vendor](https://vendor.optro.cloud/apply) , getting your API key, and making code-level changes as described below. These steps will enable you to seamlessly integrate your Power-Up into Optro.

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
## Testing

### Overriding the license status during development
During development you might wish to quickly switch between a licensed and unlicensed state to ensure correct functionality.
This can be done using the ```overrideLicense``` property for the ```LicenseProvider``` component.

The overrideLicense property accepts the following values
* ```'free'```  Any pro license returned from the API will be overridden.
* ```'pro'```  The LicenseProvider component will behave as if there is currently an active pro license regardless of the API's response.
* ```undefined``` when no value is defined the override will not be active


## Contributing

We welcome contributions to the source code - just raise a Pull Request!

## License

This library, excluding branding is provided under the MIT License.

## About The Optro Market

[Optro Market](https://www.optro.cloud) is the best place to discover Trello Power-ups with new and exciting features unlocked.

Our tools will help you build Power-Ups with best practice and monetization features baked in from the beginning.  

Follow our [step-by-step guide](https://vendor.optro.cloud/build-trello-powerup) to building a Power-Up and use these tools to turn your ideas into a reality:
* https://github.com/optro-cloud/create-trello-powerup
* https://github.com/optro-cloud/trello-powerup-full-sample
* https://github.com/optro-cloud/optro-ui-react
* https://github.com/optro-cloud/optro-api-client
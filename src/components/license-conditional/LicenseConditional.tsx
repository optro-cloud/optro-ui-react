import React from 'react';
import useLicense from '../../hooks/useLicense';
import { LicenseConditionalProps } from '../../types';

const LicenseConditional = (props: LicenseConditionalProps): React.ReactElement => {
  const licenseContext = useLicense();

  // If a loading component is provided in props and the context
  // is marked as loading.
  // return the loading component
  if (props.loading && licenseContext.loading) {
    return props.loading;
  }

  // Monetization is marked as inactive
  // Return a pro version as preference,
  // unlicensed as fallback, or none
  if (licenseContext.inactive) {
    if (props.licensed) {
      return props.licensed;
    }
    if (props.children) {
      return props.children;
    }
    if (props.unlicensed) {
      return props.unlicensed;
    }
    return <></>;
  }

  // If a unlicensed component is provided in props and the context
  // is marked as not licensed.
  // return the unlicensed component
  if (props.unlicensed && !licenseContext.licensed) {
    return props.unlicensed;
  }

  // If a children are provided in props and the context is marked as licensed.
  // return the children
  if (props.children && licenseContext.licensed) {
    return props.children;
  }

  // If a licensed component is provided in props and the context is marked as licensed.
  // return the licensed component
  if (props.licensed && licenseContext.licensed) {
    return props.licensed;
  }

  return <></>;
};

export default LicenseConditional;

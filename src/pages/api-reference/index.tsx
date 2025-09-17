import React from "react";
import Api from '../../components/Api'

const URL = "/docs/api/adapty-api.json"

const AdaptyApiReference = () => {
  return (
    <Api 
      url={URL} 
      title="Adapty API Reference" 
      socialBanner="https://adapty.io/img/og-image.png"
    />
  );
}

export default AdaptyApiReference

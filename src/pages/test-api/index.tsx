import React from "react";
import Api from '../../components/Api';

const URL = "/docs/api/adapty-api.json";

const TestApi = () => {
  return (
    <Api 
      url={URL} 
      title="Test API Reference" 
      socialBanner="https://adapty.io/img/og-image.png"
    />
  );
};

export default TestApi;

import * as msal from "@azure/msal-node";
import 'dotenv/config';

const clientConfig = {
  auth: {
    clientId: process.env.APP_ID,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.APP_SECRET,
  },
};

export const getAuth = async () => {
  const clientApp = new msal.ConfidentialClientApplication(clientConfig);

  const tokenRequest = {
    scopes: ["https://graph.microsoft.com/.default"],
  };

  try {
    const authResult = await clientApp.acquireTokenByClientCredential(tokenRequest);
    console.log(authResult)
    console.log("Access token acquired successfully:", authResult.accessToken);
    // You can use the access token for further API calls
  } catch (error) {
    console.log("Error acquiring access token:", error);
  }

};


getAuth()
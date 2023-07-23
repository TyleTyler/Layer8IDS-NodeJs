import * as msal from "@azure/msal-node";
import 'dotenv/config';



const clientConfig = {
  auth: {
    clientId: process.env.APP_CLIENT_ID,
    authority: process.env.AAD_AUTHORITY,
    clientSecret: process.env.APP_CLIENT_SECRET,
  }
};

// Create msal application object
const cca = new msal.ConfidentialClientApplication(clientConfig);

// With client credentials flows permissions need to be granted in the portal by a tenant administrator.
// The scope is always in the format "<resource>/.default"
const clientCredentialRequest = {
  scopes: [process.env.APP_CLIENT_SCOPE]
};

export const getAuth = async ()=>{
    const auth = await cca.acquireTokenByClientCredential(clientCredentialRequest).then((response) => {
      console.log(response)
      return response;
    }).catch((error) => {
      console.log(JSON.stringify(error));
    });

    return auth
}

getAuth()

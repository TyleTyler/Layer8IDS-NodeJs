import * as msal from "@azure/msal-node";
import 'dotenv/config';



const clientConfig = {
  auth: {
    clientId: process.env.APP_ID,
    authority: "https://login.microsoftonline.com/b48e6967-6899-4f70-b044-744ade464561",
    clientSecret: process.env.APP_SECRET,
  }
};

// Create msal application object
const cca = new msal.ConfidentialClientApplication(clientConfig);

// With client credentials flows permissions need to be granted in the portal by a tenant administrator.
// The scope is always in the format "<resource>/.default"
const clientCredentialRequest = {
  scopes: [
    "https://graph.microsoft.com/.default"]
};

export const getAuth = async ()=>{
    const auth = await cca.acquireTokenByClientCredential(clientCredentialRequest).then((response) => {
      return response;
    }).catch((error) => {
      console.log(JSON.stringify(error));
    });

    return auth
}



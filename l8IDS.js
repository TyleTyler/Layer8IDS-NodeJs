import { getAuth } from './authProvider.js';

// Get the access token
const token = await getAuth();

// Set the request URL to fetch security events
const url = 'https://graph.microsoft.com/v1.0/security/alerts';

// Set the request headers
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${token.accessToken}`
};

// Send the request to fetch security events
fetch(url, { headers })
  .then(response => response.json())
  .then(data => {
    // Extract the security events from the results
    const securityEvents = data.value;
    // Log the security events in the console
    const ids = []   
    for (const property of securityEvents){
      console.log(property.id)
    }


    // Provide a visual confirmation of the security events
    if (securityEvents.length > 0) {
      console.log('Security events retrieved successfully.');
    } else {
      console.log('No security events found.');
    }
  })
  .catch(err => {
    console.error('Error sending request:', err);
  });

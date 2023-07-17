import { getAuth } from './authProvider.js';

// Get the access token
const token = await getAuth();
console.log(token)

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
    console.log(data)
    const securityEvents = data.value;
    console.log(securityEvents)
    // Log the security events in the console
    console.log(JSON.stringify(securityEvents, null, 2));

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

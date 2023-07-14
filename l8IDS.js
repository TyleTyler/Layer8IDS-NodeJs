import { getAuth } from './authProvider.js';
import fetch from 'node-fetch';

async function main() {
  try {
    // Get the access token
    const token = await getAuth();
    console.log(token)

    // Get incidents from the past 48 hours
    const dateTime = new Date().toISOString();
    const url = `https://api.security.microsoft.com/api/incidents?$filter=lastUpdateTimege${dateTime}`;

    // Set the request headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token.accessToken}`
    };

    // Send the request
    const response = await fetch(url, { headers });
    if (!response.ok) {
        console.log(response)
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Check if the response contains incidents
    if (!data || !data.value) {
      throw new Error('No incidents found in the response');
    }

    // Extract the incidents from the results
    const incidents = data.value;

    // Log the incidents in the console
    console.log(JSON.stringify(incidents, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();

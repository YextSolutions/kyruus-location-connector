declare const clientId: string;
declare const clientSecret: string;
declare const customer: string;

const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams ({
        'grant_type': 'client_credentials',
        'client_id': `${clientId}`,
        'client_secret': `${clientSecret}`
    })
}

//fetch URL for Kyruus
let locationUrl = `https://api.kyruus.com/v9/${customer}/locations?per_page=50&sort=name&exclude_from_analytics=true`;

//fetchLocations

export const fetchLocations = async (inputString) => {
  //fetch access token
  var tokenRequest = await fetch ('https://api.kyruus.com/oauth2/token', requestOptions).then(response => response.json());
  var accessToken = tokenRequest.access_token;

  var requestOptionsNew = {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${accessToken}`
      }
  }
  //fetch locations info
  const inputJson = JSON.parse(inputString);
  const pageToken = inputJson.pageToken;

  let urlParams = new URLSearchParams(locationUrl.slice(locationUrl.indexOf('?')));
  let currentPage = urlParams.get('page');

  // Reset the LocationUrl variable to its original value before appending the pageToken parameter
  let updatedLocationUrl = locationUrl.split('&page=')[0];

  if (pageToken && currentPage !== pageToken) {
    // Append the pageToken parameter to the updatedLocationUrl
    updatedLocationUrl = `${updatedLocationUrl}&page=${pageToken}`;
  }
  const locations = await fetch(updatedLocationUrl, requestOptionsNew).then((response) =>
    response.json()
  );
  if (locations._locations.length === 0) {
    const response = { data: [] };
    const stringify = JSON.stringify(response);
    return stringify;
  } else {
    const response = { data: locations };
    if ((locations._locations).length > 0 && pageToken) {
    // if (pageToken) {
      response['nextPageToken'] = parseInt(pageToken) + 1;
    } else {
      response['nextPageToken'] = 2;
    }
    const stringify = JSON.stringify(response);
    return stringify;
  }
};
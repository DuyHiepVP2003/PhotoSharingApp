/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
async function fetchModel(url) {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('User not logged in')
  }
  try {
    const headers = { 'Authorization': `Bearer ${token}` };
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error('Failed to fetch model');
    }
    const model = await response.json();
    return model;
  } catch (error) {
    console.error('Error fetching model:', error);
    throw error;
  }
}

export default fetchModel;

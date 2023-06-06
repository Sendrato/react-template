/**
 * Application config.
 *
 * @property {string} baseUrl='http://localhost:3000' - Application base URL.
 */

const appConfig = {
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID || '',
};

export default appConfig;
